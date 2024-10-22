import Barrier from "../models/BarrierModel.js";
import BarrierReview from "../models/BarrierReviewsModel.js";


export const getBarriersReviews = async (req, res) => {
    try {
        const barriersReviews = await BarrierReview.findAll();
        res.json(barriersReviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBarrierReview = async (req, res) => {
    try {
        if (!req.params.id) throw new Error("must provide id in the params");
        const barrierReview1 = await BarrierReview.findOne({
            where: { id: req.params.id },
        });
        if (!barrierReview1) throw new Error("Barrier Review not found");
        res.status(200).json(barrierReview1);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBarrierReviewsByReviewId = async (req, res) => {
    const { reviewId } = req.params;
    try {
        const reviews = await BarrierReview.findAll({
            where: { reviewId: reviewId },
            include: [
                {
                    model: Barrier,
                },
            ],
        });

        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching barrier reviews:', error);
        res.status(500).json({ message: 'An error occurred while fetching barrier reviews.', error: error.message });
    }
};

export const createBarrierReview = async (req, res) => {
    const { barrierId, reviewId, reviews } = req.body;
    try {
        if (!barrierId || !reviewId || !reviews)
            throw new Error("BarrierId, reviewId and reviews are required");
        const newBarrierReview = await BarrierReview.create({
            barrierId,
            reviewId,
            reviews,
        });
        res.status(201).json(newBarrierReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBarrierReview = async (req, res) => {
    const { id } = req.params;
    const { barrierId, reviewId, reviews } = req.body;
    try {
        if (!id) throw new Error("must provide id in the params");
        const barrierReviewToUpdate = await BarrierReview.findOne({
            where: { id },
        });
        if (!barrierReviewToUpdate) throw new Error("Barrier Review not found");
        barrierReviewToUpdate.barrierId = barrierId;
        barrierReviewToUpdate.reviewId = reviewId;
        barrierReviewToUpdate.reviews = reviews;
        await barrierReviewToUpdate.save();
        res.status(200).json(barrierReviewToUpdate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBarrierReview = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) throw new Error("must provide id in the params");
        const barrierReviewToDelete = await BarrierReview.findOne({
            where: { id },
        });
        if (!barrierReviewToDelete) throw new Error("Barrier Review not found");
        await barrierReviewToDelete.destroy();
        res.status(200).json({ message: "Barrier Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBarrierReviewsByReviewId = async (req, res) => {
    const { reviewId } = req.params;
    try {
        const barrierReviewsToDelete = await BarrierReview.findAll({
            where: { reviewId },
        });
        if (barrierReviewsToDelete.length === 0) throw new Error("No Barrier Reviews found for this reviewId");
        await BarrierReview.destroy({
            where: { reviewId },
        });
        res.status(200).json({ message: "Barrier Reviews deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
