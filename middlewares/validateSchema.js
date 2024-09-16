function validateSchema(schema) {
    return async (req, res, next) => {
        try {
            // Validate request body against the schema
            await schema.validateAsync(req.body, { abortEarly: false }); // Collect all errors, do not stop at the first error
            next(); // Continue to the next middleware if validation is successful
        } catch (error) {
            if (error.isJoi) {
                // Joi validation error
                const validationErrors = error.details.map((detail) => ({
                    field: detail.path.join('.'), // The path of the invalid field
                    message: detail.message,      // The error message
                    type: detail.type             // The type of validation error
                }));

                // Respond with a 400 status code and validation error details
                return res.status(400).json({ errors: validationErrors });
            }

            // Pass the error to the next middleware (could be an unknown error)
            next(error);
        }
    };
}

export default validateSchema;