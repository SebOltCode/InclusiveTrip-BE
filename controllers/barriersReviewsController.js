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
    const { barrierId, reviewId, reviews } = req.body;
    try {
        if (!barrierId || !reviewId || !reviews)
            throw new Error("BarrierId, reviewId and reviews are required");
        if (!req.params.id) throw new Error("must provide id in the params");
        const barrierReview1 = await BarrierReview.findOne({
            where: { id: req.params.id },
        });
        if (barrierReview1) {
            barrierReview1.barrierId = barrierId;
            barrierReview1.reviewId = reviewId;
            barrierReview1.reviews = reviews;
            await barrierReview1.save();
            res.json(barrierReview1);
        } else {
            res.status(404).json({ message: "Update Failed : Barrier Reviews not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBarrierReview = async (req, res) => {
    try {
        if (!req.params.id) throw new Error("must provide id in the params");
        const barrierReview1 = await BarrierReview.findOne({
            where: { id: req.params.id },
        });
        if (barrierReview1) {
            await barrierReview1.destroy();
            res.json({ message: "Barrier Review deleted successfully" });
        } else {
            res.status(404).json({ message: "Delete Faild:Barrier Review not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteBarrierReviewsByReviewId = async (req, res) => {
    try {
        if (!req.params.reviewId) throw new Error("must provide id in the params");

        const barrierReviews = await BarrierReview.findAll({
            where: { reviewId: req.params.reviewId },
        });
        if (barrierReviews.length > 0) {
            barrierReviews.forEach(async (barrierReview) => {
                await barrierReview.destroy();
            });
            res.json({ message: "Barrier Review deleted successfully" });
        } else {
            res.status(404).json({ message: "Delete Faild: Barrier Reviews not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
