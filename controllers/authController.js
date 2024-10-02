import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/UserModel.js';


export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, roleId } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'Please provide firstName, lastName,email and password in the body' });
        }
        const alreadyExists = await User.findOne({ where: { email } });
        if (alreadyExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, email, password: hashedPassword, roleId });
        await newUser.save();

        res.status(201).json({ success: 'welcome on board' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (!existingUser) {
            return res.status(400).json({ message: "User doesn't exist" });
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        const isProduction = process.env.NODE_ENV === 'production';
        const cookieOptions = {
            httpOnly: isProduction ? 'true' : 'false',
            sameSite: isProduction ? 'None' : 'Lax',
            secure: isProduction,
            path: '/',
        };

        res.cookie('token', token, cookieOptions);
        return res.status(200).json({ success: 'Welcome back' });

    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ message: 'An error occurred while signing in.' });
    }
};

export const signout = async (req, res) => {
    try {
        const isProduction = process.env.NODE_ENV === 'production';
        const cookieOptions = {
            httpOnly: isProduction ? 'true' : 'false',
            sameSite: isProduction ? 'None' : 'Lax',
            secure: isProduction,
            path: '/',
        };
        res.clearCookie('token', cookieOptions);
        res.status(200).json({ success: 'goodbye' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const me = async (req, res) => {
    try {
        const myUser = await User.findOne({ where: { id: req.userId } });
        if (!myUser) {
            return res.status(400).json({ message: "please login" });
        }
        res.status(200).json(myUser);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}