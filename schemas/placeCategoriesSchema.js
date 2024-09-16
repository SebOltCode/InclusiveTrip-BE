import Joi from "joi";


const placeCategoriesSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'Name should be a type of text.',
        'string.empty': 'Name cannot be an empty field.',
        'any.required': 'Name is required.'
    }),
    searchName: Joi.string().required().messages({
        'string.base': 'Search name should be a type of text.',
        'string.empty': 'Search name cannot be an empty field.',
        'any.required': 'Search name is required.'
    }),
    tag: Joi.string().optional().messages(),
    icon: Joi.string().required().messages({
        'string.base': 'Icon should be a type of text.',
        'string.empty': 'Icon cannot be an empty field.',
        'any.required': 'Icon is required.'
    }),
    iconColor: Joi.string().required().messages({
        'string.base': 'Icon color should be a type of text.',
        'string.empty': 'Icon color cannot be an empty field.',
        'any.required': 'Icon color is required.'
    }),
    description: Joi.string().allow('').optional().messages({
        'string.base': 'Description should be a type of text.',
        'string.empty': 'Description can be an empty field.',
    }),
    selected: Joi.boolean().required().messages({
        'boolean.base': 'Selected should be a boolean.',
        'any.required': 'Selected is required.'
    })
});

export default placeCategoriesSchema;