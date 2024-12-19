import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import {User} from "../models/User";
import submitService from "../services/submitServive";
import ID from "../models/ID";

const submitController = {
    async submit(req: Request, res: Response) {
        try {
            const {questionId, choice} = req.body;
            const userId = (req.user as User)?._id;
            const result = await submitService.submit(userId, questionId as any, choice);
            res.status(StatusCodes.OK).json(result);
        } catch (error: any) {
            res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message});
        }
    },

    async getSubmissions(req: Request, res: Response) {
        try {
            const {questionId} = req.query;
            const userId = (req.user as User)?._id;
            const result = await submitService.getSubmissions({
                userId, questionId: ID.from(questionId as string)});
            res.json(result);
        } catch (error: any) {
            res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message});
        }
    },
};

export default submitController;
