import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Right, roleRights } from "../config/roles";
import {User, UserModel} from "../models/User";
import jwtUtils from "../utils/jwt";
import logger from "../utils/logger";

export default function requireAuth(requiredRights: Right[]) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const authHeader = req.headers.authorization;
        // 1. Check if Authorization header exists and starts with "Bearer"
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "Access token required" });
            return;
        }
        try {
            // 2. Extract and verify the token
            const token = authHeader.split(" ")[1];
            logger.debug("Received Token: " + token);
            const decoded = jwtUtils.verifyToken(token, "access");
            logger.debug("Decoded Token: " + decoded);
            const user = await (UserModel.findById(decoded)) as User;
            if (!user) {
                res.status(StatusCodes.UNAUTHORIZED).json({message: "User not found"});
                return;
            }
            logger.debug("User Found: " + user);
            if (requiredRights.length) {
                const hasAllRights = requiredRights.every((right) =>
                    roleRights.get(user.role)?.includes(right));
                logger.debug("User Rights: " + roleRights.get(user.role));
                logger.debug("Required Rights: " + requiredRights);
                if (!hasAllRights) {
                    res.status(StatusCodes.FORBIDDEN).json({message: "Insufficient permissions"});
                    return;
                }
            }
            req.user = user;
            next();
        } catch (error) {
            logger.error("Error in requireAuth middleware: ", error);
            res.status(StatusCodes.UNAUTHORIZED).json({message: "Invalid or expired token"});
        }
    };
}
