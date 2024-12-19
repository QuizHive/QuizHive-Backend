import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import {User} from "../models/User";
import userService from "../services/userService";
import {NotFoundError} from "../utils/errors";
import logger from "../utils/logger";

const userController = {
    async getUserById(req: Request, res: Response) {
        let userInfo;
        try {
            const {user: inputId} = req.params;
            logger.debug("Request: getUserById; user: " + inputId);
            if (!inputId || inputId === "me") userInfo = (req.user as User).getUserInfo();
            else userInfo = await userService.getUserInfo(inputId as any);
            if (userInfo === null) throw new NotFoundError("User not found");
            res.status(StatusCodes.OK).json(userInfo);
        } catch (error: any) {
            res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message});
        }
    },

    async getScoreboard(req: Request, res: Response) {
        try {
            const {limit} = req.params;
            logger.debug("Request: getScoreboard; n: " + limit);
            const userId = (req.user as any)._id;
            const result = await userService.getScoreboard(userId as any, limit as any);
            res.status(StatusCodes.OK).json(result);
        } catch (error: any) {
            res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message});
        }
    },
};

export default userController;
