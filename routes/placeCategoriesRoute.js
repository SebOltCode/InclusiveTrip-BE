import { Router } from "express";
import { getPlaceCategories, createPlaceCategory, getPlaceCategory, updatePlaceCategory, deletePlaceCategory, getSelectedPlaceCategories } from "../controllers/placeCategoriesController.js";
import validateSchema from "../middlewares/validateSchema.js";
import placeCategoriesSchema from "../schemas/placeCategoriesSchema.js";
import { requireAdmin } from "../middlewares/verifyToken.js";
import { asyncHandler } from "../utils/httpError.js";

const placeCategoriesRouter = Router();

placeCategoriesRouter.get("/", asyncHandler(getPlaceCategories));
placeCategoriesRouter.get("/selected", asyncHandler(getSelectedPlaceCategories));
placeCategoriesRouter.get("/:name", asyncHandler(getPlaceCategory));
placeCategoriesRouter.post("/", requireAdmin, validateSchema(placeCategoriesSchema), asyncHandler(createPlaceCategory));
placeCategoriesRouter.put("/:id", requireAdmin, validateSchema(placeCategoriesSchema), asyncHandler(updatePlaceCategory));
placeCategoriesRouter.delete("/:id", requireAdmin, asyncHandler(deletePlaceCategory));

export default placeCategoriesRouter;
