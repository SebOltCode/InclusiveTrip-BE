export class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

// Forwards rejected promises of async route handlers to the Express error handler
export const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
