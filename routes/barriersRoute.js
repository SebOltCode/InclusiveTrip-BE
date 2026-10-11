import { Router } from "express";
import { getBarrier, getBarriers, createBarrier, deleteBarrier, updateBarrier, getSelectedBarriers } from "../controllers/barriersController.js";
import validateSchema from "../middlewares/validateSchema.js";
import barriersSchema from "../schemas/barriersSchema.js";
import { requireAdmin } from "../middlewares/verifyToken.js";
import { asyncHandler } from "../utils/httpError.js";

const barrierRouter = Router();

barrierRouter.get("/", asyncHandler(getBarriers));
barrierRouter.get("/selected", asyncHandler(getSelectedBarriers));
barrierRouter.get("/:name", asyncHandler(getBarrier));
barrierRouter.post("/", requireAdmin, validateSchema(barriersSchema), asyncHandler(createBarrier));
barrierRouter.put("/:name", requireAdmin, validateSchema(barriersSchema), asyncHandler(updateBarrier));
barrierRouter.delete("/:name", requireAdmin, asyncHandler(deleteBarrier));

export default barrierRouter;
