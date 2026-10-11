import { Router } from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser, getCountUsers } from "../controllers/usersController.js";
import validateSchema from "../middlewares/validateSchema.js";
import usersSchema, { usersUpdateSchema } from "../schemas/usersSchema.js";
import verifyToken, { requireAdmin } from "../middlewares/verifyToken.js";
import { asyncHandler } from "../utils/httpError.js";

const usersRoute = Router();

usersRoute.get('/', requireAdmin, asyncHandler(getUsers));
usersRoute.get('/count', asyncHandler(getCountUsers));
usersRoute.get('/:id', verifyToken, asyncHandler(getUser));
usersRoute.post('/', requireAdmin, validateSchema(usersSchema), asyncHandler(createUser));
usersRoute.put('/:id', verifyToken, validateSchema(usersUpdateSchema), asyncHandler(updateUser));
usersRoute.delete('/:id', verifyToken, asyncHandler(deleteUser));

export default usersRoute;
