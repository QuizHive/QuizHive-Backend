import ID from "../models/ID";
import {CategoryModel, Difficulty, QuestionModel} from "../models/Question";
import {ConflictError, NotFoundError} from "../utils/errors";

export interface CreateQuestionInput {
    title: string;
    text: string;
    options: string[];
    correct: number;
    categoryId: ID;
    difficulty: Difficulty;
}

const questionService = {

    /**
     * Retrieve all categories.
     * @returns  All categories
     */
    async getAllCategories() {
        return CategoryModel.find();
    },

    /**
     * Create a new category.
     * @param title  The name of the category
     * @param description  The description of the category
     * @returns  The newly created category
     */
    async createCategory(title: string, description: string) {
        // Check for duplicate category name
        const existingCategory = await CategoryModel.findOne({categoryName: title});
        if (existingCategory)
            throw new ConflictError(`Category "${title}" already exists`);
        const newCategory = await CategoryModel.create({categoryName: title, description});
        // Create and save the category
        return newCategory.save();
    },

    /**
     * Delete a category by its ID.
     * @param categoryId  The ID of the category
     * @returns  The deleted category
     */
    async deleteCategory(categoryId: ID) {
        const category = await CategoryModel.findByIdAndDelete(categoryId);
        if (!category)
            throw new NotFoundError("Category not found");
        // Optionally: Cascade delete questions belonging to the category
        await QuestionModel.deleteMany({category: categoryId});
        await CategoryModel.findByIdAndDelete(categoryId);
        return category;
    },

    /**
     * Create a new question under a category.
     */
    async createQuestion(input: CreateQuestionInput) {
        const {title, text, options, correct, categoryId, difficulty} = input;
        const existingCategory = await CategoryModel.findById(categoryId);
        if (!existingCategory)
            throw new NotFoundError("Category not found");
        const newQuestion = await QuestionModel.create({
            title,
            text,
            options,
            correct,
            category: existingCategory,
            difficulty,
            solves: 0, // Initialize solves count
            createdAt: new Date(),
        });
        return newQuestion.save();
    },

    /**
     * Retrieve all questions with optional filters.
     */
    async getQuestions(filters: { categoryId?: ID; difficulty?: number; limit?: number }) {
        const query: any = {};
        if (filters.categoryId) query.category = query.categoryId;
        if (filters.difficulty) query.difficulty = filters.difficulty;
        if (filters.limit) return QuestionModel.find(query).limit(filters.limit).populate("category");
        return QuestionModel.find(query).populate("category");
    },

    /**
     * Retrieve a question by its ID.
     */
    async getQuestionById(questionId: ID) {
        const question = await QuestionModel.findById(questionId).populate("category");
        if (!question) throw new NotFoundError("Question not found");
        return question;
    },

    /**
     * Delete a question by its ID.
     */
    async deleteQuestion(questionId: ID) {
        const question = await QuestionModel.findByIdAndDelete(questionId);
        if (!question) throw new NotFoundError("Question not found");
        return question;
    },
};

export default questionService;
