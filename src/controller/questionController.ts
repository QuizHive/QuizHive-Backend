import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import {User} from "../models/User";
import questionService, {CreateQuestionInput} from "../services/questionService";
import logger from "../utils/logger";
import {child} from "winston";

const questionController = {
    async getCategories(req: Request, res: Response) {
        try {
            const result = await questionService.getAllCategories();
            res.json(result);
        } catch (error: any) {
            res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message});
        }
    },

    async createCategory(req: Request, res: Response) {
        try {
            const {categoryName, description} = req.body;
            logger.debug("Request: createCategory; title: " + categoryName + "; description: " + description);
            const result = await questionService.createCategory(categoryName, description);
            res.status(StatusCodes.CREATED).json({message: "Category created successfully", result});
        } catch (error: any) {
            res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message});
        }
    },

    async deleteCategory(req: Request, res: Response) {
        try {
            const {id} = req.params;
            await questionService.deleteCategory(id as any);
            res.json({message: "Category deleted successfully"});
        } catch (error: any) {
            res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message});
        }
    },

    async getQuestions(req: Request, res: Response) {
        try {
            const filters = req.query;
            const result = await questionService.getQuestions(filters);
            res.json(result);
        } catch (error: any) {
            res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message});
        }
    },

    async getQuestionById(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const result = await questionService.getQuestionById(id as any);
            res.json(result);
        } catch (error: any) {
            res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message});
        }
    },

    async createQuestion(req: Request, res: Response) {
        try {
            const questionData = req.body as CreateQuestionInput;
            logger.debug("Request: createQuestion; questionData: " + JSON.stringify(questionData, null, ""));
            const result = await questionService.createQuestion(questionData);
            res.status(StatusCodes.CREATED).json({message: "Question created successfully", result});
        } catch (error: any) {
            res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message});
        }
    },

    async deleteQuestion(req: Request, res: Response) {
        try {
            const {id} = req.params;
            await questionService.deleteQuestion(id as any);
            res.json({message: "Question deleted successfully"});
        } catch (error: any) {
            res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message});
        }
    },

    async solveQuestion(req: Request, res: Response) {
        try {
            const {questionId} = req.params;
            const {choice} = req.body;
            const userId = (req.user as User)?._id;
            const {isCorrect, gainedScore} = await questionService.solveQuestion(userId, questionId as any, choice);
            res.json({isCorrect, gainedScore, message: isCorrect ? "Correct!" : "Wrong answer!"});
        } catch (error: any) {
            res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message});
        }
    },
};

export default questionController;
