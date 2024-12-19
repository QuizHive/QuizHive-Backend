import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import questionService, {CreateQuestionInput} from "../services/questionService";
import logger from "../utils/logger";
import {User} from "../models/User";
import ID from "../models/ID";

const questionController = {
    async createCategory(req: Request, res: Response) {
        const {categoryName, description} = req.body;
        logger.debug("Request: createCategory; title: " + categoryName + "; description: " + description);
        const result = await questionService.createCategory(categoryName, description);
        logger.debug("Response: createCategory; result: " + result);
        res.status(StatusCodes.CREATED).json({message: "Category created successfully", result});
    },

    async createQuestion(req: Request, res: Response) {
        const questionData = req.body as CreateQuestionInput;
        logger.debug("Request: createQuestion; questionData: " + JSON.stringify(questionData));
        const result = await questionService.createQuestion(questionData);
        logger.debug("Response: createQuestion; result: " + result);
        res.status(StatusCodes.CREATED).json({message: "Question created successfully", result});
    },

    async getCategories(req: Request, res: Response) {
        const result = await questionService.getAllCategories();
        res.json(result);
    },

    async getQuestions(req: Request, res: Response) {
        const filters = req.query;
        const result = await questionService.getQuestions(filters);
        res.json(result);
    },

    async getQuestionById(req: Request, res: Response) {
        const {id} = req.params;
        const result = await questionService.getQuestionById(id as any);
        res.json(result);
    },

    async deleteQuestion(req: Request, res: Response) {
        const {id} = req.params;
        await questionService.deleteQuestion(id as any);
        res.json({message: "Question deleted successfully"});
    },

    async deleteCategory(req: Request, res: Response) {
        const {id} = req.params;
        await questionService.deleteCategory(id as any);
        res.json({message: "Category deleted successfully"});
    },

    async solveQuestion(req: Request, res: Response) {
        const {questionId} = req.params;
        const {answerIndex} = req.body;
        const userId = (req.user as User)?._id;
        const result = await questionService.solveQuestion(userId, questionId as any, answerIndex);
        res.json({correct: result.correct, message: result.correct ? "Correct!" : "Wrong answer"});
    },
};

export default questionController;