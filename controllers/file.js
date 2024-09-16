import multer from "multer";
import fs from 'fs/promises';
import path from "path";

const allowedMimeTypes = ["image/jpeg", "image/jpg","image/png"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/reviewsPhotos");
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

export const upload = multer({ storage, fileFilter, limits: { fileSize: 5242880 } });


export const deleteFile1 = async (filename) => {

  
  const filePath = path.join("uploads/reviewsPhotos", filename);
  try{
  await fs.access(filePath);
  await fs.unlink(filePath);
  console.log(`File ${filename} deleted successfully.`);
  }
  catch(err){
    console.log("file not found");
  }
};