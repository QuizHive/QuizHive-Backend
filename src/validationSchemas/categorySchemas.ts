import Joi from 'joi';

export const createCategorySchema = Joi.object({
    categoryName: Joi.string().required().messages({
        'any.required': 'Category name is required',
    }),
    description: Joi.string().required().messages({
        'any.required': 'Description is required',
    }),
});

export const updateCategorySchema = Joi.object({
    categoryName: Joi.string().required().messages({
        'any.required': 'Category name is required',
    }),
    description: Joi.string().required().messages({
        'any.required': 'Description is required',
    }),
});