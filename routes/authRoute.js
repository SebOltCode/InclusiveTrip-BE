import { Router } from "express";
import { signin,register,signout,me } from "../controllers/authController.js";
import validateSchema from "../middlewares/validateSchema.js";
import signinSchema from "../schemas/signinSchema.js";
import usersSchema from "../schemas/usersSchema.js";
import verifyToken from "../middlewares/verifyToken.js";


const authRouter = Router();


authRouter.post("/signin",validateSchema(signinSchema),signin);
authRouter.post("/register",validateSchema(usersSchema),register);
authRouter.get("/me",verifyToken,me);
authRouter.delete("/signout",signout);


export default authRouter;