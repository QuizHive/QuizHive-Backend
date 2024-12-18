import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import questionService, {CreateQuestionInput} from "../services/questionService";
import logger from "../utils/logger";

const questionController = {
    async createCategory(req: Request, res: Response) {
        const { categoryName, description } = req.body;
        logger.debug("Request: createCategory; categoryName: " + categoryName + "; description: " + description);
        const result = await questionService.createCategory(categoryName, description);
        logger.debug("Response: createCategory; result: " + result);
        res.status(StatusCodes.CREATED).json({ message: "Category created successfully", result });
    },

    async createQuestion(req: Request, res: Response) {
        const questionData = req.body as CreateQuestionInput;
        logger.debug("Request: createQuestion; questionData: " + JSON.stringify(questionData));
        const result = await questionService.createQuestion(questionData);
        logger.debug("Response: createQuestion; result: " + result);
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

    async solveQuestion(req: Request, res: Response) {
        const { questionId } = req.params;
        const { answerIndex } = req.body;
        const userId = (req.user as any)?._id;

        const result = await questionService.solveQuestion(userId, questionId, answerIndex);
        res.json({ correct: result.correct, message: result.correct ? "Correct!" : "Wrong answer" });
    },
};

export default questionController;