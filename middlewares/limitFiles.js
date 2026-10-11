import { MAX_FILES_PER_REVIEW } from '../controllers/file.js';

const limitFilesMiddleware = (req, res, next) => {
    const files = req.files;
    if (files && files.length > MAX_FILES_PER_REVIEW) {
        return res.status(400).json({ message: `You can upload a maximum of ${MAX_FILES_PER_REVIEW} files per review` });
    }
    next();
};

export default limitFilesMiddleware;
