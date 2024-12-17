import Joi from 'joi';

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCategorySchema:
 *       type: object
 *       required:
 *         - categoryName
 *         - description
 *       properties:
 *         categoryName:
 *           type: string
 *         description:
 *           type: string
 */
export const createCategorySchema = Joi.object({
    categoryName: Joi.string().required().messages({
        "any.required": "Category name is required",
    }),
    description: Joi.string().required().messages({
        "any.required": "Description is required",
    }),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateQuestionSchema:
 *       type: object
 *       required:
 *         - questionText
 *         - options
 *         - correct
 *         - category
 *         - difficulty
 *       properties:
 *         questionText:
 *           type: string
 *         options:
 *           type: array
 *           items:
 *             type: string
 *         correct:
 *           type: number
 *         category:
 *           type: string
 *           format: uuid
 *         difficulty:
 *           type: number
 */
export const createQuestionSchema = Joi.object({
    questionText: Joi.string().required().messages({
        "any.required": "Question text is required",
    }),
    options: Joi.array().items(Joi.string()).min(2).required().messages({
        "array.min": "Options must include at least 2 items",
        "any.required": "Options are required",
    }),
    correct: Joi.number().integer().min(0).required().messages({
        "any.required": "Correct answer index is required",
    }),
    category: Joi.string().required().messages({
        "any.required": "Category ID is required",
    }),
    difficulty: Joi.number().integer().valid(1, 2, 3).required().messages({
        "any.only": "Difficulty must be 1 (Easy), 2 (Medium), or 3 (Hard)",
        "any.required": "Difficulty level is required",
    }),
});