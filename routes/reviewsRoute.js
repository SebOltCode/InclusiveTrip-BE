import { Router } from "express";
import {
    getReviews,
    createReview,
    getReviewsByPlaceIdAndBarrierId,
    getReviewsByPlaceId,
    getPlaceRatingSummary,
    updateReview,
    deleteReview,
    getReviewsByUser,
    getReviewsCount,
    getReviewById
} from "../controllers/reviewsController.js";
import validateSchema from "../middlewares/validateSchema.js";
import reviewsSchema from "../schemas/reviewsSchema.js";
import verifyToken from "../middlewares/verifyToken.js";
import { asyncHandler } from "../utils/httpError.js";

const reviewRouter = Router();

reviewRouter.get("/", asyncHandler(getReviews));
reviewRouter.get("/filtered", asyncHandler(getReviewsByPlaceIdAndBarrierId));
reviewRouter.get("/count", asyncHandler(getReviewsCount));
reviewRouter.get("/user", verifyToken, asyncHandler(getReviewsByUser));
reviewRouter.get("/place/:placeId", asyncHandler(getReviewsByPlaceId));
reviewRouter.get("/place/:placeId/summary", asyncHandler(getPlaceRatingSummary));
reviewRouter.get("/reviewid/:reviewId", asyncHandler(getReviewById));
reviewRouter.post("/", verifyToken, validateSchema(reviewsSchema), asyncHandler(createReview));
reviewRouter.put("/:reviewId", verifyToken, validateSchema(reviewsSchema), asyncHandler(updateReview));
reviewRouter.delete("/:reviewId", verifyToken, asyncHandler(deleteReview));

export default reviewRouter;
