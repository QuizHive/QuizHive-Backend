import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import {Right, roleRights} from "../config/roles";
import {UserModel} from "../models/User";
import jwtUtils from "../utils/jwt";

export default function requireAuth(requiredRights: Right[]) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>"

        if (!token) {
            res.status(StatusCodes.UNAUTHORIZED).json({message: "Access token required"});
            return;
        }

        try {
            const user = UserModel.findById(jwtUtils.verifyToken(token, "access"));

            if (!user) {
                res.status(StatusCodes.UNAUTHORIZED).json({message: "User not found"});
                return;
            }

            if (requiredRights.length) {
                const hasAllRights = requiredRights.every((right) =>
                    roleRights.get(user.role)?.includes(right));

                if (!hasAllRights) {
                    res.status(StatusCodes.FORBIDDEN).json({message: "Insufficient permissions"});
                    return;
                }
            }

            req.user = user;
            next();
        } catch (error) {
            res.status(StatusCodes.UNAUTHORIZED).json({message: "Invalid token"});
        }
    };
}

// Utility function to combine multiple authorization checks
export function combineAuthorization(...middlewares: Array<(req: Request, res: Response, next: NextFunction) => void>) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        for (const middleware of middlewares) {
            try {
                await new Promise((resolve, reject) => {
                    middleware(req, res, (err?: any) => reject(err ? err : true));
                });
            } catch (error) {
                return next(error);
            }
        }
        next();
    };
}
