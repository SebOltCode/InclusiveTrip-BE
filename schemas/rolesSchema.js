import Joi from "joi";


const rolesSchema = Joi.object({
    type: Joi.string().required().messages({
        'string.base': 'Role type must be a string',
        'string.empty': 'Role type is required',
        'any.required': 'Role type is required'
    })
});

export default rolesSchema;