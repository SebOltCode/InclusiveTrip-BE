import { Router } from "express";

import {
    getBarrierReviewsByReviewId, getBarriersReviews, getBarrierReview, createBarrierReview, updateBarrierReview,
    deleteBarrierReview,
    deleteBarrierReviewsByReviewId,
} from "../controllers/barriersReviewsController.js";
import validateSchema from "../middlewares/validateSchema.js";
import barriersReviewsSchema from "../schemas/barriersReviewsSchema.js";

const barrierReviewRouter = Router();


barrierReviewRouter.get("/review/:reviewId", getBarrierReviewsByReviewId);
barrierReviewRouter.get("/", getBarriersReviews);
barrierReviewRouter.get("/:id", getBarrierReview);
barrierReviewRouter.post("/", validateSchema(barriersReviewsSchema), createBarrierReview);
barrierReviewRouter.put("/:id", validateSchema(barriersReviewsSchema), updateBarrierReview);
barrierReviewRouter.delete("/:id", deleteBarrierReview);
barrierReviewRouter.delete("/review/:reviewId", deleteBarrierReviewsByReviewId);


export default barrierReviewRouter;