import {Request} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import config from "../config/config";
import ID from "../models/ID";
import {ForbiddenError, UnauthorizedError} from "./errors";

interface IJwtPayload {
    id: string;
    type: string;
}

const jwtUtils = {
    // Generate an access token
    generateAccessToken(id: string): string {
        const payload = {
            id,
            type: "access",
        };
        return jwt.sign(payload, config.jwt.secret, {
            expiresIn: `${config.jwt.accessExpirationMinutes}m`,
        });
    },

    // Generate a refresh token
    generateRefreshToken(id: string): string {
        const payload = {
            id,
            type: "refresh",
        };
        return jwt.sign(payload, config.jwt.secret, {
            expiresIn: `${config.jwt.refreshExpirationDays}d`,
        });
    },

    // Verify a token and return the id string
    verifyToken(token: string, type: "refresh" | "access"): string {
        const payload = jwt.verify(token, config.jwt.secret) as JwtPayload;
        if (!payload) throw new UnauthorizedError("Invalid token payload");
        if (jwtUtils.isTokenExpired(token))
            throw new UnauthorizedError("Token has expired");
        if (payload.type !== type)
            throw new UnauthorizedError("Invalid token type");
        return payload.id;
    },

    // Resolve the user from a request using access token
    async resolveUser(request: Request): Promise<ID> {
        const token = request.headers.authorization?.split(" ")[1];
        if (!token) throw new UnauthorizedError("Access token is required");
        const decoded = jwtUtils.verifyToken(token, "access");
        if (!decoded) throw new UnauthorizedError("Invalid token payload");
        return ID.from(decoded);
    },

    // Check if a token is expired
    isTokenExpired(token: string): boolean {
        try {
            const {exp} = jwt.verify(token, config.jwt.secret) as { exp: number };
            return Date.now() >= exp * 1000;
        } catch {
            return true; // Treat any error as an expired token
        }
    },

    // Verify and refresh an access token using a refresh token
    refreshAccessToken(refreshToken: string): string {
        try {
            const id = jwtUtils.verifyToken(refreshToken, "refresh");
            return jwtUtils.generateAccessToken(id);
        } catch (error) {
            throw new ForbiddenError("Invalid refresh token");
        }
    },
};

export default jwtUtils;
