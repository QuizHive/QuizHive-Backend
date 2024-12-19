import Joi from "joi";

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           $ref: '#/components/schemas/id'
 *           description: Category ID (Unique identifier)
 *         categoryName:
 *           type: string
 *           description: Category name
 *           example: "Geography"
 *         description:
 *           type: string
 *           description: Category description
 *           example: Questions about earth and geography, etc.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCategory:
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
 *     CategoryCreatedResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Category created successfully"
 *         result:
 *           $ref: '#/components/schemas/Category'
 */

/*****************************  Question Schemas  ******************************/

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       properties:
 *         id:
 *           $ref: '#/components/schemas/id'
 *         title:
 *           type: string
 *         text:
 *           type: string
 *         options:
 *           type: array
 *           items:
 *             type: string
 *             minItems: 4
 *             maxItems: 4
 *         correct:
 *           type: number
 *           minimum: 0
 *           maximum: 3
 *         category:
 *           $ref: '#/components/schemas/Category'
 *         difficulty:
 *           type: number
 *           enum:
 *             - 1
 *             - 2
 *             - 3
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateQuestionSchema:
 *       type: object
 *       required:
 *         - title
 *         - text
 *         - options
 *         - correct
 *         - categoryId
 *         - difficulty
 *       properties:
 *         title:
 *           type: string
 *         text:
 *           type: string
 *         options:
 *           type: array
 *           items:
 *             type: string
 *             minItems: 4
 *             maxItems: 4
 *         correct:
 *           type: number
 *           minimum: 0
 *           maximum: 3
 *         categoryId:
 *           $ref: '#/components/schemas/id'
 *         difficulty:
 *           type: number
 *           enum:
 *             - 1
 *             - 2
 *             - 3
 */
export const createQuestionSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": "Question title is required",
    }),
    text: Joi.string().required().messages({
        "any.required": "Question text is required",
    }),
    options: Joi.array().items(Joi.string()).min(4).max(4).required().messages({
        "array.min": "Question must have 4 options",
        "array.max": "Question must have 4 options",
        "any.required": "Options are required",
    }),
    correct: Joi.number().integer().min(0).max(3).required().messages({
        "any.required": "Correct answer index is required",
        "number.min": "Correct answer index must be between 0 and 3",
        "number.max": "Correct answer index must be between 0 and 3",
    }),
    categoryId: Joi.string().required().messages({
        "any.required": "Category ID is required",
    }),
    difficulty: Joi.number().integer().valid(1, 2, 3).required().messages({
        "any.only": "Difficulty must be 1 (Easy), 2 (Medium), or 3 (Hard)",
        "any.required": "Difficulty level is required",
    }),
});
/**
 * @swagger
 * components:
 *   schemas:
 *     QuestionCreatedResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Question created successfully"
 *         result:
 *           $ref: '#/components/schemas/Question'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SubmitAnswerSchema:
 *       type: object
 *       required:
 *         - questionId
 *         - choice
 *       properties:
 *         questionId:
 *           $ref: '#/components/schemas/id'
 *         answer:
 *           type: number
 */
export const submitAnswerSchema = Joi.object({
    questionId: Joi.string().required().messages({
        "any.required": "Question ID is required",
    }),
    choice: Joi.number().integer().min(0).max(3).required().messages({
        "any.required": "Answer index is required",
        "number.min": "Answer index must be between 0 and 3",
        "number.max": "Answer index must be between 0 and 3",
    }),
});
