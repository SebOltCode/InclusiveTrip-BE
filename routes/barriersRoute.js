import { Router } from "express";

import { getBarrier, getBarriers, createBarrier, deleteBarrier, updateBarrier, getSelectedBarriers } from "../controllers/barriersController.js";
import validateSchema from "../middlewares/validateSchema.js";
import barriersSchema from "../schemas/barriersSchema.js";

const barrierRouter = Router();



barrierRouter.get("/", getBarriers);
barrierRouter.get("/selected", getSelectedBarriers);
barrierRouter.get("/:name", getBarrier);
barrierRouter.post("/", validateSchema(barriersSchema), createBarrier);
barrierRouter.put("/:name", validateSchema(barriersSchema), updateBarrier);
barrierRouter.delete("/:name", deleteBarrier);


export default barrierRouter;
