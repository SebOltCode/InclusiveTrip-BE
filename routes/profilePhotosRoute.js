import { Router } from "express";

import { createProfilePhoto,getProfilePhoto,deleteProfilePhoto,updateProfilePhoto } from "../controllers/profilePhotosController.js";
import { uploadProfilePhotos } from "../controllers/profileFiles.js";
import validateSchema from "../middlewares/validateSchema.js";
import profilePhotoSchema from "../schemas/profilePhotoSchema.js";
import verifyToken from "../middlewares/verifyToken.js";
const ProfilePhotosRouter = Router();


ProfilePhotosRouter.post("/:userid", uploadProfilePhotos.single("file"),verifyToken, createProfilePhoto);

ProfilePhotosRouter.get("/:userid", getProfilePhoto);

ProfilePhotosRouter.delete("/:userid",verifyToken, deleteProfilePhoto);

ProfilePhotosRouter.put("/:userid",validateSchema(profilePhotoSchema),verifyToken, updateProfilePhoto);


export default ProfilePhotosRouter;