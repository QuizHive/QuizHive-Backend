import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Email must be valid",
        "any.required": "Email is required",
    }),
    passwordHash: Joi.string().required().messages({
        "any.required": "Password is required",
    }),
});

export const registerSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Email must be valid",
        "any.required": "Email is required",
    }),
    passwordHash: Joi.string().min(10).required().messages({
        "string.min": "Password Hash must be at least 10 characters",
        "any.required": "Password is required",
    }),
    nickname: Joi.string().required().messages({
        "any.required": "Nickname is required",
    }),
    role: Joi.string().valid("player", "admin").required().messages({
        "any.only": "Role must be either player or admin",
        "any.required": "Role is required",
    }),
});

export const refreshTokenSchema = Joi.object({
    refreshToken: Joi.string().required().messages({
        "any.required": "Refresh Token is required",
    }),
});

export const forgetReqSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Email must be valid",
        "any.required": "Email is required",
    }),
});


