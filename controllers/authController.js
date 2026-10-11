import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/UserModel.js';
import { HttpError } from '../utils/httpError.js';

const getCookieOptions = () => {
    const isProduction = process.env.NODE_ENV === 'production';
    return {
        httpOnly: true,
        sameSite: isProduction ? 'None' : 'Lax',
        secure: isProduction,
        path: '/',
    };
};

export const register = async (req, res) => {
    // roleId, blocked etc. are intentionally ignored: new users always get the default role
    const { firstName, lastName, email, password } = req.body;
    const alreadyExists = await User.findOne({ where: { email } });
    if (alreadyExists) throw new HttpError(409, "User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ firstName, lastName, email, password: hashedPassword });
    res.status(201).json({ success: 'welcome on board' });
};

export const signin = async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.scope('withPassword').findOne({ where: { email } });
    // Same message for unknown email and wrong password, so accounts can't be enumerated
    const isMatch = existingUser && await bcrypt.compare(password, existingUser.password);
    if (!isMatch) throw new HttpError(401, "Invalid email or password");
    if (existingUser.blocked) throw new HttpError(403, "This account is blocked");

    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });

    res.cookie('token', token, { ...getCookieOptions(), maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.status(200).json(existingUser);
};

export const signout = async (req, res) => {
    res.clearCookie('token', getCookieOptions());
    res.status(200).json({ success: 'goodbye' });
};

export const me = async (req, res) => {
    res.status(200).json(req.user);
};
