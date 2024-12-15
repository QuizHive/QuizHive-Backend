import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import authService from "../services/authService";

const authController = {
    async login(req: Request, res: Response) {
        try {
            const {email, passwordHash} = req.body;
            const result = await authService.loginUser(email, passwordHash);
            res.json(result);
        } catch (error: any) {
            res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message});
        }
    },

    async register(req: Request, res: Response) {
        try {
            const {email, passwordHash, nickname, role} = req.body;
            const result = await authService.registerUser(email, passwordHash, nickname, role);
            res.status(StatusCodes.CREATED).json({message: "User registered successfully", result});
        } catch (error: any) {
            res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message});
        }
    },

    async refreshToken(req: Request, res: Response) {
        try {
            const {refreshToken} = req.body;
            const result = await authService.refreshToken(refreshToken);
            res.json(result);
        } catch (error: any) {
            res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message});
        }
    },

    async forgotPassword(req: Request, res: Response) {

    },

    async resetPassword(req: Request, res: Response) {

    },
};

export default authController;
