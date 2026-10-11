import Joi from "joi";

const firstName = Joi.string().max(255).messages({
  "string.base": "First name must be a string",
  "string.empty": "First name is required",
  "any.required": "First name is required",
});
const lastName = Joi.string().max(255).messages({
  "string.base": "Last name must be a string",
  "string.empty": "Last name is required",
  "any.required": "Last name is required",
});
const email = Joi.string().email().max(255).messages({
  "string.base": "Email must be a string",
  "string.empty": "Email is required",
  "string.email": "Email must be a valid email address",
  "any.required": "Email is required",
});
const password = Joi.string().min(8).max(128).messages({
  "string.base": "Password must be a string",
  "string.empty": "Password is required",
  "string.min": "Password must be at least 8 characters long",
  "any.required": "Password is required",
});
const roleId = Joi.number().integer().messages({
  "number.base": "Role ID must be a number",
});
const blocked = Joi.boolean().messages({
  "boolean.base": "Blocked must be a boolean",
});

// Self-registration: role and blocked state can't be chosen by the user
export const registerSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  email: email.required(),
  password: password.required(),
});

// Admin creates a user
const usersSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  email: email.required(),
  password: password.required(),
  roleId: roleId.default(3),
  profilePhoto: Joi.string().allow(null).optional(),
  blocked: blocked.default(false),
});

// Partial update; roleId/blocked are additionally restricted to admins in the controller
export const usersUpdateSchema = Joi.object({
  firstName,
  lastName,
  email,
  password,
  roleId,
  blocked,
}).min(1);

export default usersSchema;
