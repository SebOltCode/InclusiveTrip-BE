import users from "../models/UserModel.js";
import { deleteFile2 } from "./profileFiles.js";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Definiere __dirname manuell
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createProfilePhoto = async (req, res) => {
  const { userId } = req;
  try {
    if (!req.file) throw new Error("Please upload a file");
    if (!userId) throw new Error("Please login first");

    const timestamp = Date.now();
    const ext = path.extname(req.file.originalname);
    const newFilename = `${timestamp}${ext}`;
    const newFilePath = path.join(__dirname, '..', 'uploads', 'profilePhotos', newFilename);

    // Stelle sicher, dass das Verzeichnis existiert
    const dir = path.dirname(newFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.renameSync(req.file.path, newFilePath);

    const user = await users.findOne({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    user.profilePhoto = `${process.env.BASE_URL}/uploads/profilePhotos/${newFilename}`;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getProfilePhoto = async (req, res) => {
  try {
    if (!req.params.userid)
      throw new Error("Please provide userid in the params");
    const user = await users.findOne({ where: { id: req.params.userid } });
    if (!user) throw new Error("User not found");
    res.status(200).json(user.profilePhoto);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteProfilePhoto = async (req, res) => {
  const { userId } = req;
  try {
    if (!userId) throw new Error("Please login ");
    if (!req.params.userid)
      throw new Error("Please provide userid in the params");
    const user = await users.findOne({ where: { id: req.params.userid } });
    if (!user) throw new Error("User not found");
    if (user.id !== userId)
      throw new Error("You are not allowed to delete this profile photo.");

    const profilePhotoPath = user.profilePhoto.split("/").pop();
    user.profilePhoto = null;
    await user.save();
    deleteFile2(profilePhotoPath);
    res.status(200).json({ message: "Profile photo deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProfilePhoto = async (req, res) => {
  const { userId } = req;
  try {
    if (!userId) throw new Error("Please login ");
    if (!req.params.userid)
      throw new Error("Please provide userid in the params");
    const user = await users.findOne({ where: { id: req.params.userid } });
    if (!user) throw new Error("User not found");
    if (user.id !== userId)
      throw new Error("You are not allowed to delete this profile photo.");
    user.profilePhoto = req.body.profilePhoto;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};