import sequelize from "../db/index.js";
import BarrierReview from "../models/BarrierReviewsModel.js";
import Review from "../models/ReviewModel.js";
import User from '../models/UserModel.js';
import FileUpload from '../models/FileUploadModel.js';
import { deleteReviewPhoto } from "./file.js";
import { HttpError } from "../utils/httpError.js";

// Only public data of the author is exposed (no email address)
const reviewIncludes = [
    {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
    },
    {
        model: FileUpload,
        attributes: ['id', 'fileName', 'fileType', 'fileSize', 'filePath']
    },
];

export const findOwnReviewOrFail = async (reviewId, userId) => {
    const review = await Review.findByPk(reviewId);
    if (!review) throw new HttpError(404, "Review not found.");
    if (review.userId !== userId) throw new HttpError(403, "You are not allowed to modify this review.");
    return review;
};

// Deletes a review together with its barrier ratings, photo records and photo files
export const deleteReviewWithDependencies = async (review) => {
    const files = await FileUpload.findAll({ where: { reviewId: review.id } });
    await sequelize.transaction(async (transaction) => {
        await BarrierReview.destroy({ where: { reviewId: review.id }, transaction });
        await FileUpload.destroy({ where: { reviewId: review.id }, transaction });
        await review.destroy({ transaction });
    });
    await Promise.all(files.map((file) => deleteReviewPhoto(file.fileName)));
};

export const getReviews = async (req, res) => {
    const reviews = await Review.findAll();
    res.status(200).json(reviews);
};

export const getReviewsCount = async (req, res) => {
    const reviewsCount = await Review.count();
    res.status(200).json({ count: reviewsCount });
};

export const getReviewsByUser = async (req, res) => {
    const reviews = await Review.findAll({
        where: { userId: req.userId },
        include: reviewIncludes,
        order: [['createdAt', 'DESC']]
    });
    res.status(200).json(reviews);
};

export const getReviewsByPlaceId = async (req, res) => {
    const reviews = await Review.findAll({
        where: { placeId: req.params.placeId },
        include: reviewIncludes,
        order: [['createdAt', 'DESC']]
    });
    res.status(200).json(reviews);
};

// Average rating per barrier and overall for one place, computed in a single query
export const getPlaceRatingSummary = async (req, res) => {
    const barrierReviews = await BarrierReview.findAll({
        attributes: ['barrierId', 'reviews'],
        include: [{ model: Review, attributes: [], where: { placeId: req.params.placeId } }],
    });

    const perBarrier = {};
    let total = 0;
    let count = 0;
    for (const { barrierId, reviews } of barrierReviews) {
        const value = parseInt(reviews, 10);
        if (Number.isNaN(value)) continue;
        perBarrier[barrierId] ??= { sum: 0, count: 0 };
        perBarrier[barrierId].sum += value;
        perBarrier[barrierId].count += 1;
        total += value;
        count += 1;
    }

    const averages = Object.fromEntries(
        Object.entries(perBarrier).map(([barrierId, { sum, count }]) => [barrierId, Math.round(sum / count)])
    );

    res.status(200).json({
        averages,
        overallAverage: count > 0 ? Math.round(total / count) : 0,
        ratingsCount: count,
    });
};

export const getReviewById = async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId, { include: reviewIncludes });
    if (!review) throw new HttpError(404, "No review found.");
    res.status(200).json(review);
};

export const createReview = async (req, res) => {
    const { placeName, placeId, comment, placeCategoryId } = req.body;
    const newReview = await Review.create({
        placeName,
        placeId,
        comment,
        placeCategoryId,
        userId: req.userId,
    });
    res.status(201).json(newReview);
};

export const updateReview = async (req, res) => {
    const { placeName, placeId, comment, placeCategoryId } = req.body;
    const review = await findOwnReviewOrFail(req.params.reviewId, req.userId);
    await review.update({ placeName, placeId, comment, placeCategoryId });
    res.status(200).json(review);
};

export const deleteReview = async (req, res) => {
    // Ownership is checked before anything (including photos) is deleted
    const review = await findOwnReviewOrFail(req.params.reviewId, req.userId);
    await deleteReviewWithDependencies(review);
    res.status(200).json({ message: "Review deleted successfully." });
};

export const getReviewsByPlaceIdAndBarrierId = async (req, res) => {
    const { placeId, barrierId } = req.query;
    if (!placeId || !barrierId) throw new HttpError(400, "placeId and barrierId are required");

    const reviews = await BarrierReview.findAll({
        where: { barrierId },
        include: [{
            model: Review,
            where: { placeId }
        }]
    });
    res.status(200).json(reviews);
};
