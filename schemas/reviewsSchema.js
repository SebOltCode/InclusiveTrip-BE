import Joi from "joi";

const reviewsSchema = Joi.object({
    placeName: Joi.string().max(255).required().messages({
        'string.base': 'Name should be a type of text.',
        'string.empty': 'Name cannot be an empty field.',
        'any.required': 'Name is required.'
    }),
    // OSM ids are numeric; they are stored as string
    placeId: Joi.alternatives().try(Joi.number().integer(), Joi.string().pattern(/^\d+$/)).required().messages({
        'alternatives.match': 'placeId must be a number',
        'any.required': 'placeId is required'
    }),
    comment: Joi.string().max(255).required().messages({
        'string.base': 'Comment must be a string',
        'string.empty': 'Comment is required',
        'string.max': 'Comment must not be longer than 255 characters',
        'any.required': 'Comment is required'
    }),
    placeCategoryId: Joi.number().integer().required().messages({
        'number.base': 'Place category ID must be a number',
        'any.required': 'Place category ID is required'
    })
});

export default reviewsSchema;
