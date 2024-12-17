import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import questionService from "../services/questionService";

const questionController = {
    async createCategory(req: Request, res: Response) {
        const { categoryName, description } = req.body;
        const result = await questionService.createCategory(categoryName, description);
        res.status(StatusCodes.CREATED).json({ message: "Category created successfully", result });
    },

    async createQuestion(req: Request, res: Response) {
        const questionData = req.body;
        const result = await questionService.createQuestion(questionData);
        res.status(StatusCodes.CREATED).json({ message: "Question created successfully", result });
    },

    async getQuestions(req: Request, res: Response) {
        const filters = req.query;
        const result = await questionService.getQuestions(filters);
        res.json(result);
    },

    async getQuestionById(req: Request, res: Response) {
        const { id } = req.params;
        const result = await questionService.getQuestionById(id);
        res.json(result);
    },

    async deleteQuestion(req: Request, res: Response) {
        const { id } = req.params;
        await questionService.deleteQuestion(id);
        res.json({ message: "Question deleted successfully" });
    },

    async deleteCategory(req: Request, res: Response) {
        const { id } = req.params;
        await questionService.deleteCategory(id);
        res.json({ message: "Category deleted successfully" });
    },
};

export default questionController;