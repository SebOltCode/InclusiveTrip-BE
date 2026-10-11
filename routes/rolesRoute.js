import { Router } from "express";
import { getRoles, getRole, createRole, updateRole, deleteRole } from "../controllers/rolesController.js";
import validateSchema from "../middlewares/validateSchema.js";
import rolesSchema from "../schemas/rolesSchema.js";
import { requireAdmin } from "../middlewares/verifyToken.js";
import { asyncHandler } from "../utils/httpError.js";

const rolesRoute = Router();

rolesRoute.get('/', asyncHandler(getRoles));
rolesRoute.get('/:id', asyncHandler(getRole));
rolesRoute.post('/', requireAdmin, validateSchema(rolesSchema), asyncHandler(createRole));
rolesRoute.put('/:id', requireAdmin, validateSchema(rolesSchema), asyncHandler(updateRole));
rolesRoute.delete('/:id', requireAdmin, asyncHandler(deleteRole));

export default rolesRoute;
