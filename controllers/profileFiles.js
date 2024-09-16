import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Hilfsfunktion, um den Verzeichnisnamen zu ermitteln
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profilePhotos");
  },
  filename: function (req, file, cb) {
    const filename = file.originalname;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File Type nicht erlaubt!"));
  }
};

export const uploadProfilePhotos = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5242880 },
});

export const deleteFile2 = (filePath) => {
  const fullPath = path.join(
    __dirname,
    "..",
    "uploads/profilePhotos",
    filePath
  );
  fs.unlink(fullPath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${err}`);
    } else {
      console.log(`File deleted: ${fullPath}`);
    }
  });
};
