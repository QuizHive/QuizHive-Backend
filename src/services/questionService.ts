import {CategoryModel, QuestionModel} from "../models/Question";
import {BadRequestError, ConflictError, NotFoundError} from "../utils/errors";

interface CreateQuestionInput {
    questionText: string;
    options: string[];
    correct: number;
    category: string;
    difficulty: number;
}

interface UpdateQuestionInput {
    questionText?: string;
    options?: string[];
    correct?: number;
    category?: string;
    difficulty?: number;
}

const questionService = {
    /**
     * Create a new category.
     */
    async createCategory(categoryName: string, description: string) {
        // Check for duplicate category name
        const existingCategory = await CategoryModel.findOne({ categoryName });
        if (existingCategory) {
            throw new ConflictError(`Category "${categoryName}" already exists`);
        }

        // Create and save the category
        return await CategoryModel.create({
            categoryName,
            description,
        });
    },

    /**
     * Delete a category by its ID.
     */
    async deleteCategory(categoryId: string) {
        const category = await CategoryModel.findByIdAndDelete(categoryId);
        if (!category) {
            throw new NotFoundError("Category not found");
        }
        // Optionally: Cascade delete questions belonging to the category
        await QuestionModel.deleteMany({ category: categoryId });
        return category;
    },

    /**
     * Create a new question under a category.
     */
    async createQuestion(input: CreateQuestionInput) {
        const { questionText, options, correct, category, difficulty } = input;

        // Verify the category exists
        const existingCategory = await CategoryModel.findById(category);
        if (!existingCategory) {
            throw new NotFoundError("Category not found");
        }

        // Validate the correct index is within the range of options
        if (correct < 0 || correct >= options.length) {
            throw new BadRequestError("Correct answer index is out of bounds");
        }

        // Create and save the question
        return await QuestionModel.create({
            questionText,
            options,
            correct,
            category,
            difficulty,
            solves: 0, // Initialize solves count
        });
    },

    /**
     * Retrieve all questions with optional filters.
     */
    async getQuestions(filters: { category?: string; difficulty?: number }) {
        const query: any = {};

        if (filters.category) {
            query.category = filters.category;
        }

        if (filters.difficulty) {
            query.difficulty = filters.difficulty;
        }

        // Retrieve questions and populate the category reference
        return QuestionModel.find(query).populate("category");
    },

    /**
     * Retrieve a question by its ID.
     */
    async getQuestionById(questionId: string) {
        const question = await QuestionModel.findById(questionId).populate("category");
        if (!question) {
            throw new NotFoundError("Question not found");
        }
        return question;
    },

    /**
     * Update a question by its ID.
     */
    async updateQuestion(questionId: string, updates: UpdateQuestionInput) {
        const question = await QuestionModel.findById(questionId);
        if (!question) {
            throw new NotFoundError("Question not found");
        }

        // Validate and update category if provided
        if (updates.category) {
            const existingCategory = await CategoryModel.findById(updates.category);
            if (!existingCategory) {
                throw new NotFoundError("Category not found");
            }
        }

        // Validate correct index if options are updated
        if (updates.correct !== undefined) {
            const optionsLength = updates.options?.length || question.options.length;
            if (updates.correct < 0 || updates.correct >= optionsLength) {
                throw new BadRequestError("Correct answer index is out of bounds");
            }
        }

        // Update the question fields
        Object.assign(question, updates);
        await question.save();

        return QuestionModel.findById(questionId).populate("category");
    },

    /**
     * Solve a question (check the answer).
     */
    async solveQuestion(userId: string, questionId: string, answerIndex: number) {
        const question = await QuestionModel.findById(questionId);
        if (!question) {
            throw new NotFoundError("Question not found");
        }

        const isCorrect = question.correct === answerIndex;

        if (isCorrect) {
            // Increment solves if the answer is correct
            await QuestionModel.findByIdAndUpdate(questionId, { $inc: { solves: 1 } });
        }

        return { correct: isCorrect };
    },

    /**
     * Delete a question by its ID.
     */
    async deleteQuestion(questionId: string) {
        const question = await QuestionModel.findByIdAndDelete(questionId);
        if (!question) {
            throw new NotFoundError("Question not found");
        }
        return question;
    },
};

export default questionService;
