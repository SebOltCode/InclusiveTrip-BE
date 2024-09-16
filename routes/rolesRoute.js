import { Router } from "express";

import { getRoles, getRole, createRole, updateRole, deleteRole } from "../controllers/rolesController.js";
import validateSchema from "../middlewares/validateSchema.js";
import rolesSchema from "../schemas/rolesSchema.js";

const rolesRoute = Router();


rolesRoute.get('/', getRoles);
rolesRoute.get('/:id', getRole);
rolesRoute.post('/',validateSchema(rolesSchema), createRole);
rolesRoute.put('/:id',validateSchema(rolesSchema),  updateRole);
rolesRoute.delete('/:id', deleteRole);


export default rolesRoute;