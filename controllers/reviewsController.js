import BarrierReview from "../models/BarrierReviewsModel.js";
import Review from "../models/ReviewModel.js";
import User from '../models/UserModel.js';
import FileUpload from '../models/FileUploadModel.js';

import { deleteFile1 } from "./file.js";
export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const getReviewsCount = async (req, res) => {
    try {
        const reviewsCount = await Review.count();
        res.status(200).json({ count: reviewsCount });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const getReviewsByUser = async (req, res) => {
    const { userId } = req;
    try {
        if (!userId) throw new Error("Please login first");
        const reviews = await Review.findAll({
            where: { userId },
            include: [{
                model: User,
                attributes: ['firstName', 'lastName', 'email']
            },
            {
                model: FileUpload,
                attributes: ['fileName', 'fileType', 'fileSize', 'filePath']
            }],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const getReviewsByPlaceId = async (req, res) => {
    const { placeId } = req.params;
    try {
        const reviews = await Review.findAll({
            where: { placeId },
            include: [{
                model: User,
                attributes: ['firstName', 'lastName', 'email']
            },
            {
                model: FileUpload,
                attributes: ['fileName', 'fileType', 'fileSize', 'filePath']
            }],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json(reviews);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getReviewById = async (req, res) => {
    const { reviewId } = req.params;
    try {
        if (!reviewId) throw new Error("Please provide reviewId in the params");
        const reviewToGet = await Review.findOne({
            where: { reviewId },
            include: [{
                model: User,
                attributes: ['firstName', 'lastName', 'email']
            },
            {
                model: FileUpload,
                attributes: ['fileName', 'fileType', 'fileSize', 'filePath']
            }],
        });
        if (!reviewToGet) throw new Error("No review found.");
        res.status(200).json(reviewToGet);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const createReview = async (req, res) => {
    const { placeName, placeId, comment, placeCategoryId } = req.body;
    const { userId } = req;
    try {
        if (!placeId || !comment || !placeCategoryId)
            throw new Error(
                "Please provide placeId and comment and placeCategoryId in the body"
            );
        // if (!userId) throw new Error("Please login first");
        // const hasTheUserReviewed = await review.findOne({
        //   where: { placeId, userId },
        // });
        // if (hasTheUserReviewed)
        //   throw new Error("You have already reviewed this place.");
        console.log(placeName, placeId, comment, placeCategoryId, userId);
        const newReview = await Review.create({
            placeName,
            placeId,
            comment,
            placeCategoryId,
            userId,
        });

        res.status(201).json(newReview);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const { placeName, placeId, comment, placeCategoryId } = req.body;
    const { userId } = req;
    try {
        if (!placeId || !comment || !placeCategoryId)
            throw new Error(
                "Please provide placeId and comment and placeCategoryId in the body"
            );
        if (!placeId) throw new Error("please provide placeId in the params");
        if (!userId) throw new Error("Please login first");
        const updatedReview = await Review.findOne({ where: { id: reviewId } });
        if (!updatedReview) throw new Error("Review not found.");
        if (updatedReview.userId !== userId)
            throw new Error("You are not allowed to update this review.");
        await updatedReview.update({
            placeName,
            placeId,
            comment,
            placeCategoryId,
            userId,
        });
        await updatedReview.save();
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const deleteReview = async (req, res) => {
    const { reviewId } = req.params;
    const { userId } = req;
    try {
        if (!reviewId) throw new Error("please provide reviewId in the params");
        if (!userId) throw new Error("Please login first");
        const filesToBeDeleted = await FileUpload.findAll({
            where: { reviewId }
        });
        filesToBeDeleted.forEach(async (file) => {
            await deleteFile1(file.fileName);
            console.log(file.fileName);
            await file.destroy();
        });
        const review1 = await Review.findOne({ where: { id: reviewId } });
        if (!review1) throw new Error("Review not found.");
        if (review1.userId !== userId)
            throw new Error("You are not allowed to delete this review.");
        await review1.destroy();
        res.status(200).json({ message: "Review deleted successfully." });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};



export const getReviewsByPlaceIdAndBarrierId = async (req, res) => {
    const { placeId, barrierId } = req.query;

    try {
        if (!placeId || !barrierId) {
            throw new Error("placeId and barrierId are required");
        }

        const reviews = await BarrierReview.findAll({
            where: { barrierId },
            include: [{
                model: Review,
                where: { placeId }
            }]
        });

        if (reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this placeId and barrierId.' });
        }

        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
};
