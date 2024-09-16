import Joi from "joi";

const fileUploadSchema = Joi.object({
    fileName: Joi.string().required().messages({
        'string.base': 'File name must be a string',
        'string.empty': 'File name is required',
        'any.required': 'File name is required'
    }),
    fileType: Joi.string().required().messages({
        'string.base': 'File type must be a string',
        'string.empty': 'File type is required',
        'any.required': 'File type is required'
    }),
    fileSize: Joi.number().required().messages({
        'number.base': 'File size must be a number',
        'any.required': 'File size is required'
    }),
    filePath: Joi.string().required().messages({
        'string.base': 'File path must be a string',
        'string.empty': 'File path is required',
        'any.required': 'File path is required'
    }),
    reviewId: Joi.number().required().messages({
        'number.base': 'Review ID must be a number',
        'any.required': 'Review ID is required'
    })
});
export default fileUploadSchema;