import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import Role from '../models/RoleModel.js';

const getTokenFromCookies = (cookieHeader = '') => {
    for (const part of cookieHeader.split(';')) {
        const [key, ...rest] = part.trim().split('=');
        if (key === 'token') return rest.join('=');
    }
    return null;
};

const verifyToken = async (req, res, next) => {
    const token = getTokenFromCookies(req.headers.cookie);
    if (!token) return res.status(401).json({ message: 'Unauthorized. Please sign in' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id, { include: [{ model: Role }] });
        if (!user) return res.status(401).json({ message: 'Unauthorized. Please sign in' });
        if (user.blocked) return res.status(403).json({ message: 'This account is blocked' });
        req.userId = user.id;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token. Please sign in again' });
    }
};

export const isAdmin = (user) => user?.Role?.type?.toLowerCase() === 'admin';

export const requireAdmin = [
    verifyToken,
    (req, res, next) => {
        if (!isAdmin(req.user)) return res.status(403).json({ message: 'Admin rights required' });
        next();
    },
];

export default verifyToken;
