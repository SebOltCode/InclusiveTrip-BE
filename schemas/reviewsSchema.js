import Joi from "joi";
import User from "../models/UserModel.js";

const reviewsSchema = Joi.object({
    placeName: Joi.string().required().messages({
        'string.base': 'Name should be a type of text.',
        'string.empty': 'Name cannot be an empty field.',
        'any.required': 'Name is required.'
    }),
    placeId: Joi.number().required().messages({
        'number.base': 'placeId must be a number',
        'any.required': 'placeId is required'
    }),
    comment: Joi.string().required().messages({
        'string.base': 'Comment must be a string',
        'string.empty': 'Comment is required',
        'any.required': 'Comment is required'
    }),
    placeCategoryId: Joi.number().required().messages({
        'number.base': 'Place category ID must be a number',
        'any.required': 'Place category ID is required'
    })
});

export default reviewsSchema;