import { Router } from "express";
import {
    getReviews,
    createReview,
    getReviewsByPlaceIdAndBarrierId,
    getReviewsByPlaceId,
    updateReview,
    deleteReview,
    getReviewsByUser,
    getReviewsCount,
    getReviewById
} from "../controllers/reviewsController.js";
import validateSchema from "../middlewares/validateSchema.js";
import reviewsSchema from "../schemas/reviewsSchema.js";
import verifyToken from "../middlewares/verifyToken.js";

const reviewRouter = Router();


reviewRouter.get("/", getReviews);
reviewRouter.get("/filtered", getReviewsByPlaceIdAndBarrierId);
reviewRouter.get("/count", getReviewsCount);
reviewRouter.get("/user", verifyToken, getReviewsByUser);
reviewRouter.get("/place/:placeId", getReviewsByPlaceId);
reviewRouter.get("/reviewid/:reviewId", getReviewById);
reviewRouter.post("/", validateSchema(reviewsSchema), verifyToken, createReview);
reviewRouter.put("/:reviewId", validateSchema(reviewsSchema), verifyToken, updateReview);
reviewRouter.delete("/:reviewId", verifyToken, deleteReview);

export default reviewRouter;