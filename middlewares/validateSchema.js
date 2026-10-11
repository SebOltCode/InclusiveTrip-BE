function validateSchema(schema) {
    return async (req, res, next) => {
        try {
            // Unknown fields are stripped, so clients can't sneak in e.g. roleId or userId
            req.body = await schema.validateAsync(req.body, { abortEarly: false, stripUnknown: true });
            next();
        } catch (error) {
            if (error.isJoi) {
                const validationErrors = error.details.map((detail) => ({
                    field: detail.path.join('.'),
                    message: detail.message,
                    type: detail.type
                }));
                return res.status(400).json({ errors: validationErrors });
            }
            next(error);
        }
    };
}

export default validateSchema;
