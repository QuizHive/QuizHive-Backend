import Joi from 'joi';

export const createQuestionSchema = Joi.object({
    questionText: Joi.string().required().messages({
        'any.required': 'Question text is required',
    }),
    options: Joi.array().items(Joi.string().required()).min(2).required().messages({
        'array.min': 'At least two options are required',
        'any.required': 'Options are required',
    }),
    correctIndex: Joi.number().integer().min(0).required().messages({
        'number.min': 'Correct index must be at least 0',
        'any.required': 'Correct index is required',
    }),
    category: Joi.string().required().messages({
        'any.required': 'Category is required',
    }),
});

export const solveQuestionSchema = Joi.object({
    answerIndex: Joi.number().integer().min(0).required().messages({
        'number.min': 'Answer index must be at least 0',
        'any.required': 'Answer index is required',
    }),
});