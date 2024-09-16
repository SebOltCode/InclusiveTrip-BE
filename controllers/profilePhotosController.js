import users from "../models/UserModel.js";

import { deleteFile2 } from "./profileFiles.js";

export const createProfilePhoto = async (req, res) => {
  const { userId } = req;
  try {
    if (!req.file) throw new Error("Please upload a file");
    if (!userId) throw new Error("Please login first");
    const user = await users.findOne({ where: { id: userId } });
    if (!user) throw new Error("User not found");
    user.profilePhoto = `http://localhost:3000/profilePhotos/${req.file.filename}`;
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

    const profilePhotoPath = user.profilePhoto.split("/").pop(); // Extrahiert den Dateinamen aus der URL
    user.profilePhoto = null;
    await user.save();
    deleteFile2(profilePhotoPath); // Übergeben Sie den Dateinamen an deleteFile2
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
