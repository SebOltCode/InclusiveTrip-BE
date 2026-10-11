import { Router } from "express";
import {
    getBarrierReviewsByReviewId, getBarriersReviews, getBarrierReview, createBarrierReview, updateBarrierReview,
    deleteBarrierReview,
    deleteBarrierReviewsByReviewId,
} from "../controllers/barriersReviewsController.js";
import validateSchema from "../middlewares/validateSchema.js";
import barriersReviewsSchema from "../schemas/barriersReviewsSchema.js";
import verifyToken from "../middlewares/verifyToken.js";
import { asyncHandler } from "../utils/httpError.js";

const barrierReviewRouter = Router();

barrierReviewRouter.get("/review/:reviewId", asyncHandler(getBarrierReviewsByReviewId));
barrierReviewRouter.get("/", asyncHandler(getBarriersReviews));
barrierReviewRouter.get("/:id", asyncHandler(getBarrierReview));
barrierReviewRouter.post("/", verifyToken, validateSchema(barriersReviewsSchema), asyncHandler(createBarrierReview));
barrierReviewRouter.put("/:id", verifyToken, validateSchema(barriersReviewsSchema), asyncHandler(updateBarrierReview));
barrierReviewRouter.delete("/review/:reviewId", verifyToken, asyncHandler(deleteBarrierReviewsByReviewId));
barrierReviewRouter.delete("/:id", verifyToken, asyncHandler(deleteBarrierReview));

export default barrierReviewRouter;
