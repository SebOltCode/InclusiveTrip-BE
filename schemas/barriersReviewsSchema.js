import Joi from "joi";

const barriersReviewsSchema = Joi.object({
    barrierId: Joi.number().integer().required().messages({
        'number.base': 'Barrier ID must be a number',
        'any.required': 'Barrier ID is required'
    }),
    reviewId: Joi.number().integer().required().messages({
        'number.base': 'Review ID must be a number',
        'any.required': 'Review ID is required'
    }),
    reviews: Joi.number().integer().min(1).max(5).required().messages({
        'number.base': 'Reviews must be a number',
        'number.min': 'Reviews must be between 1 and 5',
        'number.max': 'Reviews must be between 1 and 5',
        'any.required': 'Reviews are required'
    })
});
export default barriersReviewsSchema;
