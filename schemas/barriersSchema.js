import Joi from "joi";

const barriersSchema = Joi.object({
    name: Joi.string().required().messages({ 'string.base': 'Name should be a type of text.', 'string.empty': 'Name cannot be an empty field.', 'any.required': 'name is required.' }),
    description: Joi.string().optional().allow('').messages({ 'string.base': 'Description should be a type of text.' }),
    selected: Joi.boolean().required().messages({ 'boolean.base': 'Selected should be a boolean.', 'any.required': 'Selected is required.' })
});
export default barriersSchema;
