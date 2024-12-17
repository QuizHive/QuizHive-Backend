import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Right, roleRights } from "../config/roles";
import { UserModel } from "../models/User";
import jwtUtils from "../utils/jwt";
import { UnauthorizedError, ForbiddenError } from "../utils/errors";

// Define the DecodedToken interface
interface DecodedToken {
    id: string;
    [key: string]: any;
}

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
            const decoded = jwtUtils.verifyToken(token, "access") as unknown;

            // Ensure that decoded is an object with an 'id' property
            if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
                const decodedToken = decoded as DecodedToken; // Safe type assertion

                console.log("Decoded Token:", decodedToken); // Debug: Log the decoded token

                // 3. Fetch user from the database
                const user = await UserModel.findById(decodedToken.id);
                if (!user) {
                    throw new UnauthorizedError("User not found");
                }

                console.log("User Found:", user); // Debug: Log the user fetched

                // 4. Verify required rights against user's role
                const userRights = roleRights.get(user.role) || [];
                console.log("User Rights:", userRights); // Debug
                console.log("Required Rights:", requiredRights); // Debug

                const hasAllRights = requiredRights.every((right) => userRights.includes(right));
                if (!hasAllRights) {
                    throw new ForbiddenError("Insufficient permissions");
                }

                // Attach user to request and proceed
                req.user = user;
                next();
            } else {
                throw new UnauthorizedError("Invalid token structure");
            }
        } catch (error) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Invalid or expired token",
            });
        }
    };
}
