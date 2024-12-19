import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import {Right, roleRights} from "../config/roles";
import {User, UserModel} from "../models/User";
import jwtUtils from "../utils/jwt";
import logger from "../utils/logger";

async function getUserFromToken(req: Request): Promise<User | null> {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null;
    }
    try {
        const token = authHeader.split(" ")[1];
        logger.debug("Received Token: " + token);
        const decoded = jwtUtils.verifyToken(token, "access");
        logger.debug("Decoded Token: " + decoded);
        const user = await UserModel.findById(decoded) as User;
        if (!user) {
            return null;
        }
        logger.debug("User Found with email: " + user.email);
        return user;
    } catch (error) {
        logger.error("Error in getUserFromToken: ", error);
        return null;
    }
}

export function requireAuth(requiredRights: Right[]) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const user = await getUserFromToken(req);
        if (!user) {
            res.status(StatusCodes.UNAUTHORIZED).json({message: "Access token required or invalid"});
            return;
        }
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
    };
}

export function mayAuth() {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const user = await getUserFromToken(req);
        if (user) {
            req.user = user;
        }
        next();
    };
}
