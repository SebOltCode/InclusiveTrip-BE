const limitFilesMiddleware = (req, res, next) => {
    const files = req.files;
    if (files && files.length > 5) {
        return res.status(400).json({ message: 'You can upload a maximum of 5 files per review' });
    }
    next();
};

export default limitFilesMiddleware;