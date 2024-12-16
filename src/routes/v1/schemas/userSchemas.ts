import Joi from 'joi';

export const registerUserSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be valid',
        'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters',
        'any.required': 'Password is required',
    }),
    nickname: Joi.string().required().messages({
        'any.required': 'Nickname is required',
    }),
    role: Joi.string().valid('player', 'admin').required().messages({
        'any.only': 'Role must be either player or admin',
        'any.required': 'Role is required',
    }),
});

