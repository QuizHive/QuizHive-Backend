import Joi from "joi";

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginSchema:
 *       type: object
 *       required:
 *         - email
 *         - passwordHash
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         passwordHash:
 *           type: string
 */
export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Email must be valid",
        "any.required": "Email is required",
    }),
    passwordHash: Joi.string().required().messages({
        "any.required": "Password is required",
    }),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterSchema:
 *       type: object
 *       required:
 *         - email
 *         - passwordHash
 *         - nickname
 *         - role
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         passwordHash:
 *           type: string
 *           minLength: 10
 *         nickname:
 *           type: string
 *         role:
 *           type: string
 *           enum: [player, admin]
 */
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

/**
 * @swagger
 * components:
 *   schemas:
 *     RefreshTokenSchema:
 *       type: object
 *       required:
 *         - refreshToken
 *       properties:
 *         refreshToken:
 *           type: string
 */
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

/**
 * @swagger
 * components:
 *   schemas:
 *     RegistrationSuccessResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: User registered successfully
 *         result:
 *           description: User information
 *           $ref: '#/components/schemas/UserInfo'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginSuccessResponse:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *         refreshToken:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RefreshTokenSuccessResponse:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 */
