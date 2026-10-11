import { Router } from "express";
import { createProfilePhoto, getProfilePhoto, deleteProfilePhoto, updateProfilePhoto } from "../controllers/profilePhotosController.js";
import { uploadProfilePhotos } from "../controllers/file.js";
import validateSchema from "../middlewares/validateSchema.js";
import profilePhotoSchema from "../schemas/profilePhotoSchema.js";
import verifyToken from "../middlewares/verifyToken.js";
import { asyncHandler } from "../utils/httpError.js";

const ProfilePhotosRouter = Router();

// Authentication runs before multer, so anonymous uploads never reach the disk
ProfilePhotosRouter.post("/:userid", verifyToken, uploadProfilePhotos.single("file"), asyncHandler(createProfilePhoto));
ProfilePhotosRouter.get("/:userid", asyncHandler(getProfilePhoto));
ProfilePhotosRouter.delete("/:userid", verifyToken, asyncHandler(deleteProfilePhoto));
ProfilePhotosRouter.put("/:userid", verifyToken, validateSchema(profilePhotoSchema), asyncHandler(updateProfilePhoto));

export default ProfilePhotosRouter;
