import Joi from "joi";

const usersSchema = Joi.object({
  firstName: Joi.string().required().messages({
    "string.base": "First name must be a string",
    "string.empty": "First name is required",
    "any.required": "First name is required",
  }),
  lastName: Joi.string().required().messages({
    "string.base": "Last name must be a string",
    "string.empty": "Last name is required",
    "any.required": "Last name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
  roleId: Joi.number().default(3).messages({
    "number.base": "Role ID must be a number",
  }),
  profilePhoto: Joi.any().meta({ swaggerType: "file" }).optional().messages({
    "string.base": "Profile photo must be ",
  }),
  blocked: Joi.boolean().default(false).messages({
    "boolean.base": "Blocked must be a boolean",
  }),
});

export default usersSchema;
