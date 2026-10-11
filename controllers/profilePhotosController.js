import User from "../models/UserModel.js";
import { deleteProfilePhotoFile } from "./file.js";
import { HttpError } from "../utils/httpError.js";

const photoFileName = (url) => url?.split("/").pop();

// Users may only change their own profile photo
const assertOwnProfile = (req) => {
  if (Number(req.params.userid) !== req.userId) {
    throw new HttpError(403, "You are not allowed to change this profile photo.");
  }
};

export const createProfilePhoto = async (req, res) => {
  try {
    if (!req.file) throw new HttpError(400, "Please upload a file");
    assertOwnProfile(req);
  } catch (error) {
    await deleteProfilePhotoFile(req.file?.filename);
    throw error;
  }

  const user = req.user;
  const previousPhoto = photoFileName(user.profilePhoto);
  user.profilePhoto = `${process.env.BASE_URL}/uploads/profilePhotos/${req.file.filename}`;
  await user.save();
  await deleteProfilePhotoFile(previousPhoto);

  res.status(200).json(user);
};

export const getProfilePhoto = async (req, res) => {
  const user = await User.findByPk(req.params.userid);
  if (!user) throw new HttpError(404, "User not found");
  res.status(200).json(user.profilePhoto);
};

export const deleteProfilePhoto = async (req, res) => {
  assertOwnProfile(req);
  const user = req.user;
  const previousPhoto = photoFileName(user.profilePhoto);
  user.profilePhoto = null;
  await user.save();
  await deleteProfilePhotoFile(previousPhoto);
  res.status(200).json({ message: "Profile photo deleted" });
};

export const updateProfilePhoto = async (req, res) => {
  assertOwnProfile(req);
  const { profilePhoto } = req.body;
  // Only photos hosted by this backend may be referenced
  if (!profilePhoto.startsWith(`${process.env.BASE_URL}/uploads/profilePhotos/`)) {
    throw new HttpError(400, "profilePhoto must reference an uploaded profile photo");
  }
  const user = req.user;
  user.profilePhoto = profilePhoto;
  await user.save();
  res.status(200).json(user);
};
