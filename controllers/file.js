import multer from "multer";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { HttpError } from "../utils/httpError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const UPLOADS_DIR = path.join(__dirname, "..", "uploads");
export const REVIEW_PHOTOS_DIR = path.join(UPLOADS_DIR, "reviewsPhotos");
export const PROFILE_PHOTOS_DIR = path.join(UPLOADS_DIR, "profilePhotos");
export const MAX_FILES_PER_REVIEW = 5;

for (const dir of [REVIEW_PHOTOS_DIR, PROFILE_PHOTOS_DIR]) {
  fs.mkdirSync(dir, { recursive: true });
}

const allowedMimeTypes = {
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
};

// Files get a random name right away, so uploads can never overwrite each other
const createStorage = (destination) =>
  multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${crypto.randomUUID()}${allowedMimeTypes[file.mimetype]}`);
    },
  });

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes[file.mimetype]) {
    cb(null, true);
  } else {
    cb(new HttpError(400, "Only JPEG and PNG images are allowed"));
  }
};

const limits = { fileSize: 5 * 1024 * 1024 };

export const upload = multer({ storage: createStorage(REVIEW_PHOTOS_DIR), fileFilter, limits });
export const uploadProfilePhotos = multer({ storage: createStorage(PROFILE_PHOTOS_DIR), fileFilter, limits });

// Only the base name is used, so a stored name can never point outside the upload directory
const removeFile = async (dir, filename) => {
  if (!filename) return;
  try {
    await fs.promises.unlink(path.join(dir, path.basename(filename)));
  } catch (err) {
    if (err.code !== "ENOENT") console.error(`Error deleting file ${filename}:`, err);
  }
};

export const deleteReviewPhoto = (filename) => removeFile(REVIEW_PHOTOS_DIR, filename);
export const deleteProfilePhotoFile = (filename) => removeFile(PROFILE_PHOTOS_DIR, filename);
