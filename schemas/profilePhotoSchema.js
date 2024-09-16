import Joi from "joi";

const profilePhotoSchema = Joi.object({
  profilePhoto: Joi.any().meta({ swaggerType: "file" }).required().messages({
    "any.required": "Profile photo is required",
    "any.only": "Invalid file type. Please upload a valid file",
  }),
});

export default profilePhotoSchema;
