import Joi from "joi";

const barriersReviewsSchema = Joi.object({
    barrierId: Joi.number().required().messages({
        'number.base': 'Barrier ID must be a number',
        'any.required': 'Barrier ID is required'
    }),
    reviewId: Joi.number().required().messages({
        'number.base': 'Review ID must be a number',
        'any.required': 'Review ID is required'
    }),
    reviews: Joi.number().required().messages({
        'number.base': 'Reviews must be a number',
        'any.required': 'Reviews are required'
    })
});
export default barriersReviewsSchema;