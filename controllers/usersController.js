import bcrypt from "bcrypt";
import User from "../models/UserModel.js";
import Review from "../models/ReviewModel.js";
import { deleteReviewWithDependencies } from "./reviewsController.js";
import { deleteProfilePhotoFile } from "./file.js";
import { isAdmin } from "../middlewares/verifyToken.js";
import { HttpError } from "../utils/httpError.js";

const assertSelfOrAdmin = (req, id) => {
    if (Number(id) !== req.userId && !isAdmin(req.user)) {
        throw new HttpError(403, "You are not allowed to access this user.");
    }
};

const findUserOr404 = async (id) => {
    const user = await User.findByPk(id);
    if (!user) throw new HttpError(404, "User not found");
    return user;
};

const ensureEmailIsFree = async (email, ownId) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser && existingUser.id !== ownId) throw new HttpError(409, "user already exists");
};

export const getUsers = async (req, res) => {
    const users = await User.findAll();
    res.status(200).json(users);
};

export const getCountUsers = async (req, res) => {
    const count = await User.count();
    res.status(200).json({ count });
};

export const getUser = async (req, res) => {
    const { id } = req.params;
    assertSelfOrAdmin(req, id);
    res.status(200).json(await findUserOr404(id));
};

export const createUser = async (req, res) => {
    const { firstName, lastName, email, password, roleId, blocked, profilePhoto } = req.body;
    await ensureEmailIsFree(email);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ firstName, lastName, email, password: hashedPassword, roleId, blocked, profilePhoto });
    res.status(201).json(newUser);
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    assertSelfOrAdmin(req, id);
    const userToUpdate = await findUserOr404(id);
    const { firstName, lastName, email, password, roleId, blocked } = req.body;

    // Role and blocked state may only be changed by admins
    if ((roleId !== undefined || blocked !== undefined) && !isAdmin(req.user)) {
        throw new HttpError(403, "Only admins can change role or blocked state.");
    }
    if (email !== undefined) await ensureEmailIsFree(email, userToUpdate.id);

    const updates = { firstName, lastName, email, roleId, blocked };
    for (const [key, value] of Object.entries(updates)) {
        if (value !== undefined) userToUpdate[key] = value;
    }
    if (password !== undefined) userToUpdate.password = await bcrypt.hash(password, 10);

    await userToUpdate.save();
    res.status(200).json(userToUpdate);
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    assertSelfOrAdmin(req, id);
    const userToDelete = await findUserOr404(id);
    // Remove the user's reviews first, otherwise they would remain without an author
    const reviews = await Review.findAll({ where: { userId: userToDelete.id } });
    for (const review of reviews) {
        await deleteReviewWithDependencies(review);
    }
    await deleteProfilePhotoFile(userToDelete.profilePhoto?.split("/").pop());
    await userToDelete.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
};
