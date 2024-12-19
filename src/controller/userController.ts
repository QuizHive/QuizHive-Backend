import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import userService from "../services/userService";
import logger from "../utils/logger";

const userController = {
    async getUserById(req: Request, res: Response) {
        try {
            const {input} = req.params;
            let userId = input;
            if (input === "me") userId = (req.user as any)._id;
            const user = await userService.getUserInfo(userId as any);
            if (user === null)
                res.status(StatusCodes.NOT_FOUND).json({message: "User not found"});
            res.status(StatusCodes.OK).json(user);
        } catch (error: any) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    },

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
            res.status(StatusCodes.OK).json(users);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Internal server error",
                error: (error as any).message,
            });
        }
    },

    async getScoreboard(req: Request, res: Response) {
        try {
            const {n} = req.params;
            logger.debug("Request: getScoreboard; n: " + n);
            const userId = (req.user as any)._id;
            const result = await userService.getScoreboard(userId as any, n as any);
            res.status(StatusCodes.OK).json(result);
        } catch (error: any) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    },
};

export default userController;