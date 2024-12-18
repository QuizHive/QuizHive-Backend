import Joi from "joi";

/**
 * @swagger
 * components:
 *   schemas:
 *     SolveQuestionSchema:
 *       type: object
 *       required:
 *         - questionId
 *       properties:
 *         questionId:
 *           type: string
 *           description: The ID of the question to be solved
 */
export const solveQuestionSchema = Joi.object({
    questionId: Joi.string().required().messages({
        "any.required": "Question ID is required.",
    }),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     IncrementScoreSchema:
 *       type: object
 *       required:
 *         - points
 *       properties:
 *         points:
 *           type: integer
 *           minimum: 1
 *           description: Points to increment the user's score by
 */
export const incrementScoreSchema = Joi.object({
    points: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            "number.base": "Points must be a number.",
            "number.integer": "Points must be an integer.",
            "number.min": "Points must be at least 1.",
            "any.required": "Points are required.",
        }),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     UserUpdateSchema:
 *       type: object
 *       properties:
 *         nickname:
 *           type: string
 *           description: The user's updated nickname
 *         role:
 *           type: string
 *           enum: [player, admin]
 *           description: The user's updated role
 */
export const updateUserSchema = Joi.object({
    nickname: Joi.string().optional().messages({
        "string.base": "Nickname must be a string.",
    }),
    role: Joi.string()
        .valid("player", "admin")
        .optional()
        .messages({
            "any.only": "Role must be either 'player' or 'admin'.",
        }),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     UserDetailsSchema:
 *       type: object
 *       required:
 *         - email
 *         - nickname
 *         - role
 *         - score
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *         nickname:
 *           type: string
 *           description: The user's nickname
 *         role:
 *           type: string
 *           enum: [player, admin]
 *           description: The user's role in the system
 *         score:
 *           type: integer
 *           description: The user's current score
 */
export const userDetailsSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Email must be valid.",
        "any.required": "Email is required.",
    }),
    nickname: Joi.string().required().messages({
        "any.required": "Nickname is required.",
    }),
    role: Joi.string()
        .valid("player", "admin")
        .required()
        .messages({
            "any.only": "Role must be either 'player' or 'admin'.",
            "any.required": "Role is required.",
        }),
    score: Joi.number().integer().required().messages({
        "number.base": "Score must be a number.",
        "number.integer": "Score must be an integer.",
        "any.required": "Score is required.",
    }),
});