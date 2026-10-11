import Joi from "joi";

const profilePhotoSchema = Joi.object({
  profilePhoto: Joi.string().uri().required().messages({
    "any.required": "Profile photo is required",
    "string.uri": "Profile photo must be a URL",
  }),
});

export default profilePhotoSchema;
