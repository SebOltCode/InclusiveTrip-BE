import multer from 'multer';

export const notFoundHandler = (req, res) => {
    res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found` });
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
    }
    const status = err.status || 500;
    if (status >= 500) console.error(err);
    res.status(status).json({ message: status >= 500 ? 'Internal server error' : err.message });
};
