import { Router } from "express";
import { createFile, getFile, getFiles, deleteFile, updateFile } from "../controllers/fileUploadsController.js";
import { upload, MAX_FILES_PER_REVIEW } from "../controllers/file.js";
import validateSchema from "../middlewares/validateSchema.js";
import fileUploadSchema from "../schemas/fileUploadSchema.js";
import limitFilesMiddleware from "../middlewares/limitFiles.js";
import verifyToken, { requireAdmin } from "../middlewares/verifyToken.js";
import { asyncHandler } from "../utils/httpError.js";

const FileRouter = Router();

// Authentication runs before multer, so anonymous uploads never reach the disk
FileRouter.post("/", verifyToken, upload.array("files", MAX_FILES_PER_REVIEW), limitFilesMiddleware, asyncHandler(createFile));
FileRouter.get("/", asyncHandler(getFiles));
FileRouter.get("/:filename", asyncHandler(getFile));
FileRouter.delete("/:filename", verifyToken, asyncHandler(deleteFile));
FileRouter.put("/:filename", requireAdmin, validateSchema(fileUploadSchema), asyncHandler(updateFile));

export default FileRouter;
