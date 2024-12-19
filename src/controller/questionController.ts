import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import ID from "../models/ID";
import {User} from "../models/User";
import questionService, {CreateQuestionInput} from "../services/questionService";
import submitService from "../services/submitServive";
import logger from "../utils/logger";

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
            logger.debug("Request: getQuestions; filters: " + JSON.stringify(filters, null, ""));
            const result: any[] = (await questionService.getQuestions(filters)) as any;
            // If the user is logged in, get their last choice for each question
            if (req.user) {
                const userId = (req.user as User)._id;
                for (let i = 0; i < result.length; i++) {
                    const question = result[i];
                    const submissions = await submitService.getSubmissions({userId, questionId: question._id});
                    const lastSubmission = submissions.length ? submissions[0] : null;
                    result[i] = question.toObject();
                    result[i].lastChoiceByUser = lastSubmission?.choice;
                }
            }
            res.json(result);
        } catch (error: any) {
            res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message});
        }
    },

    async getQuestionById(req: Request, res: Response) {
        try {
            const {id} = req.params;
            let result = await questionService.getQuestionById(id as any) as any;
            // if user is logged in, then also get the user's last choice for this question
            if (req.user) {
                const userId = (req.user as User)._id;
                const submissions = await submitService.getSubmissions({userId, questionId: ID.from(id as string)});
                const lastSubmission = submissions.length ? submissions[0] : null;
                result = result.toObject();
                result.lastChoiceByUser = lastSubmission?.choice;
            }
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
};

export default questionController;
