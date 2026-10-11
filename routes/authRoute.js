import { Router } from "express";
import { signin, register, signout, me } from "../controllers/authController.js";
import validateSchema from "../middlewares/validateSchema.js";
import signinSchema from "../schemas/signinSchema.js";
import { registerSchema } from "../schemas/usersSchema.js";
import verifyToken from "../middlewares/verifyToken.js";
import { asyncHandler } from "../utils/httpError.js";

const authRouter = Router();

authRouter.post("/signin", validateSchema(signinSchema), asyncHandler(signin));
authRouter.post("/register", validateSchema(registerSchema), asyncHandler(register));
authRouter.get("/me", verifyToken, asyncHandler(me));
authRouter.delete("/signout", asyncHandler(signout));

export default authRouter;
