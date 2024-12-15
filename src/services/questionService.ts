import ID from "../models/ID";
import {Question} from "../models/Question";

const questionService = {
    async createCategory(categoryName: string, description: string) {
        // const category = new Category({
        //     category_name: categoryName,
        //     description,
        // });
        // return category.save();
    },

    async getAllCategories() {
        // return Category.find();
    },

    async getCategoryById(categoryId: string) {
        // const category = await Category.findById(ID.from(categoryId).toObjectId());
        // if (!category) {
        //     throw new Error('Category not found');
        // }
        // return category;
    },

    async updateCategory(categoryId: string, categoryName: string, description: string) {
        // const category = await Category.findByIdAndUpdate(
        //     ID.from(categoryId).toObjectId(),
        //     { category_name: categoryName, description },
        //     { new: true }
        // );
        //
        // if (!category) {
        //     throw new Error('Category not found');
        // }
        //
        // return category;
    },

    async deleteCategory(categoryId: string) {
        // const category = await Category.findByIdAndDelete(ID.from(categoryId).toObjectId());
        // if (!category) {
        //     throw new Error('Category not found');
        // }
        // return category;
    },

    async createQuestion(questionText: string, options: string[], correctIndex: number, category: string) {
        // const question = new Question({
        //     question_text: questionText,
        //     options,
        //     correct: correctIndex,
        //     category: ID.from(category).toObjectId(),
        // });
        // return question.save();
    },

    async getAllQuestions() {
        // return Question.find().populate('category');
    },

    async getQuestionById(questionId: string) {
        // const question = await Question.findById(ID.from(questionId).toObjectId()).populate('category');
        // if (!question) {
        //     throw new Error('Question not found');
        // }
        // return question;
    },

    async solveQuestion(userId: string, questionId: string, answerIndex: number) {
        // const question = await Question.findById(ID.from(questionId).toObjectId());
        // if (!question) {
        //     throw new Error('Question not found');
        // }
        //
        // const isCorrect = question.correct === answerIndex;
        // if (isCorrect) {
        //     await question.updateOne({ $inc: { solves: 1 } });
        // }
        //
        // return { correct: isCorrect };
    },
};

export default questionService;