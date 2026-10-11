import Barrier from "../models/BarrierModel.js";
import BarrierReview from "../models/BarrierReviewsModel.js";
import { findOwnReviewOrFail } from "./reviewsController.js";
import { HttpError } from "../utils/httpError.js";

const findBarrierReviewOr404 = async (id) => {
    const barrierReview = await BarrierReview.findByPk(id);
    if (!barrierReview) throw new HttpError(404, "Barrier Review not found");
    return barrierReview;
};

export const getBarriersReviews = async (req, res) => {
    const barriersReviews = await BarrierReview.findAll();
    res.json(barriersReviews);
};

export const getBarrierReview = async (req, res) => {
    res.status(200).json(await findBarrierReviewOr404(req.params.id));
};

export const getBarrierReviewsByReviewId = async (req, res) => {
    const reviews = await BarrierReview.findAll({
        where: { reviewId: req.params.reviewId },
        include: [{ model: Barrier }],
    });
    res.status(200).json(reviews);
};

export const createBarrierReview = async (req, res) => {
    const { barrierId, reviewId, reviews } = req.body;
    await findOwnReviewOrFail(reviewId, req.userId);
    const newBarrierReview = await BarrierReview.create({ barrierId, reviewId, reviews });
    res.status(201).json(newBarrierReview);
};

export const updateBarrierReview = async (req, res) => {
    const { barrierId, reviewId, reviews } = req.body;
    const barrierReviewToUpdate = await findBarrierReviewOr404(req.params.id);
    // The user must own both the current and the target review
    await findOwnReviewOrFail(barrierReviewToUpdate.reviewId, req.userId);
    await findOwnReviewOrFail(reviewId, req.userId);
    await barrierReviewToUpdate.update({ barrierId, reviewId, reviews });
    res.status(200).json(barrierReviewToUpdate);
};

export const deleteBarrierReview = async (req, res) => {
    const barrierReviewToDelete = await findBarrierReviewOr404(req.params.id);
    await findOwnReviewOrFail(barrierReviewToDelete.reviewId, req.userId);
    await barrierReviewToDelete.destroy();
    res.status(200).json({ message: "Barrier Review deleted successfully" });
};

export const deleteBarrierReviewsByReviewId = async (req, res) => {
    const { reviewId } = req.params;
    await findOwnReviewOrFail(reviewId, req.userId);
    const deleted = await BarrierReview.destroy({ where: { reviewId } });
    res.status(200).json({ message: "Barrier Reviews deleted successfully", deleted });
};
