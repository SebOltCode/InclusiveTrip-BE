import FileUpload from "../models/FileUploadModel.js";
import { deleteFile1 } from "./file.js";
import path from 'path';
import fs from 'fs';

export const createFile = async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    if (files.length > 5) {
      return res
        .status(400)
        .json({ message: "You can only upload a maximum of 5 files" });
    }
    const savedFiles = [];
    for (const file of files) {
      const timestamp = Date.now();
      const ext = path.extname(file.originalname);
      const newFilename = `${timestamp}${ext}`;
      const newFilePath = path.join(__dirname, '..', 'reviewsPhotos', newFilename);
      fs.renameSync(file.path, newFilePath);

      const newFile = new FileUpload({
        fileName: newFilename,
        fileType: file.mimetype,
        fileSize: file.size,
        filePath: `${process.env.BASE_URL}/reviewsPhotos/${newFilename}`,
        reviewId: req.body.reviewId,
      });
      const savedFile = await newFile.save();
      savedFiles.push(savedFile);
    }

    res.status(201).json(savedFiles);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getFiles = async (req, res) => {
  try {
    const files = await FileUpload.findAll();
    res.status(200).json(files);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getFile = async (req, res) => {
  try {
    if (!req.params.filename)
      throw new Error("must provide filename in the params");
    const file = await FileUpload.findOne({
      where: { fileName: req.params.filename },
    });
    if (!file) throw new Error("File not found");
    res.status(200).json(file);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteFile = async (req, res) => {
  try {
    if (!req.params.filename)
      throw new Error("must provide filename in the params");
    const file = await FileUpload.findOne({
      where: { fileName: req.params.filename },
    });
    if (!file) throw new Error("File not found");
    await file.destroy();
    deleteFile1(req.params.filename);
    res.status(200).json({ message: "File deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateFile = async (req, res) => {
  try {
    if (!req.params.filename)
      throw new Error("must provide filename in the params");
    const file = await FileUpload.findOne({
      where: { fileName: req.params.filename },
    });
    if (!file) throw new Error("File not found");
    file.fileName = req.body.fileName;
    file.fileType = req.body.fileType;
    file.fileSize = req.body.fileSize;
    file.filePath = req.body.filePath;
    await file.save();
    res.status(200).json(file);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};