import FileUpload from "../models/FileUploadModel.js";
import { deleteReviewPhoto, MAX_FILES_PER_REVIEW } from "./file.js";
import { findOwnReviewOrFail } from "./reviewsController.js";
import { HttpError } from "../utils/httpError.js";

const findFileOr404 = async (filename) => {
  const file = await FileUpload.findOne({ where: { fileName: filename } });
  if (!file) throw new HttpError(404, "File not found");
  return file;
};

export const createFile = async (req, res) => {
  const files = req.files || [];
  try {
    if (files.length === 0) throw new HttpError(400, "No files uploaded");
    const { reviewId } = req.body;
    if (!reviewId) throw new HttpError(400, "reviewId is required");
    await findOwnReviewOrFail(reviewId, req.userId);

    const existingCount = await FileUpload.count({ where: { reviewId } });
    if (existingCount + files.length > MAX_FILES_PER_REVIEW) {
      throw new HttpError(400, `You can only upload a maximum of ${MAX_FILES_PER_REVIEW} files per review`);
    }

    const savedFiles = await FileUpload.bulkCreate(
      files.map((file) => ({
        fileName: file.filename,
        fileType: file.mimetype,
        fileSize: file.size,
        filePath: `${process.env.BASE_URL}/uploads/reviewsPhotos/${file.filename}`,
        reviewId,
      }))
    );
    res.status(201).json(savedFiles);
  } catch (error) {
    // Don't keep files on disk that were rejected
    await Promise.all(files.map((file) => deleteReviewPhoto(file.filename)));
    throw error;
  }
};

export const getFiles = async (req, res) => {
  const files = await FileUpload.findAll();
  res.status(200).json(files);
};

export const getFile = async (req, res) => {
  res.status(200).json(await findFileOr404(req.params.filename));
};

export const deleteFile = async (req, res) => {
  const file = await findFileOr404(req.params.filename);
  await findOwnReviewOrFail(file.reviewId, req.userId);
  await file.destroy();
  await deleteReviewPhoto(file.fileName);
  res.status(200).json({ message: "File deleted" });
};

export const updateFile = async (req, res) => {
  const file = await findFileOr404(req.params.filename);
  const { fileName, fileType, fileSize, filePath, reviewId } = req.body;
  await file.update({ fileName, fileType, fileSize, filePath, reviewId });
  res.status(200).json(file);
};
