import { Router } from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser,getCountUsers } from "../controllers/usersController.js";
import validateSchema from "../middlewares/validateSchema.js";
import usersSchema from "../schemas/usersSchema.js";


const usersRoute = Router();


usersRoute.get('/', getUsers);
usersRoute.get('/count', getCountUsers);
usersRoute.get('/:id', getUser);
usersRoute.post('/',validateSchema(usersSchema), createUser);
usersRoute.put('/:id',validateSchema(usersSchema), updateUser);
usersRoute.delete('/:id', deleteUser);

export default usersRoute;