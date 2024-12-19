import Joi from "joi";

/**
 * @swagger
 * components:
 *   schemas:
 *     Submit:
 *       type: object
 *       properties:
 *         id:
 *           $ref: '#/components/schemas/id'
 *         question:
 *           $ref: '#/components/schemas/id'
 *         user:
 *           $ref: '#/components/schemas/id'
 *         choice:
 *           type: number
 *           required: true
 *         isCorrect:
 *           type: boolean
 *           required: true
 *         gainedScore:
 *           type: number
 *           required: true
 *         timestamp:
 *           type: string
 *           format: date-time
 *           required: true
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateSubmitSchema:
 *       type: object
 *       required:
 *         - questionId
 *         - choice
 *       properties:
 *         questionId:
 *           $ref: '#/components/schemas/id'
 *         choice:
 *           type: number
 */
export const createSubmitSchema = Joi.object({
    questionId: Joi.string().required().messages({
        "any.required": "Question ID is required",
    }),
    choice: Joi.number().integer().min(0).max(3).required().messages({
        "any.required": "Answer index is required",
        "number.min": "Answer index must be between 0 and 3",
        "number.max": "Answer index must be between 0 and 3",
    }),
});
