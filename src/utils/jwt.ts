import jwt from 'jsonwebtoken';
import { Request } from 'express';
import ID from '../models/ID';
import config from '../config/config';

interface JwtPayload {
    id: string;
    role: string;
}

const jwtUtils = {
    // Generate an access token
    generateAccessToken(payload: JwtPayload): string {
        return jwt.sign(payload, config.jwt.secret, {
            expiresIn: `${config.jwt.accessExpirationMinutes}m`,
        });
    },

    // Generate a refresh token
    generateRefreshToken(payload: JwtPayload): string {
        return jwt.sign(payload, config.jwt.secret, {
            expiresIn: `${config.jwt.refreshExpirationDays}d`,
        });
    },

    // Verify and decode a token
    verifyToken(token: string): JwtPayload {
        if (jwtUtils.isTokenExpired(token)) {
            throw new Error('Token has expired');
        }

        try {
            return jwt.verify(token, config.jwt.secret) as JwtPayload;
        } catch (error) {
            throw new Error('Invalid token');
        }
    },

    // Resolve the user from a request using access token
    async resolveUser(request: Request): Promise<ID> {
        const token = request.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new Error('Access token is required');
        }

        if (jwtUtils.isTokenExpired(token)) {
            throw new Error('Access token has expired');
        }

        const decoded = jwtUtils.verifyToken(token);

        if (!decoded || !decoded.id) {
            throw new Error('Invalid token payload');
        }

        return ID.from(decoded.id);
    },

    // Decode a token without verification (use cautiously)
    decodeToken(token: string): JwtPayload {
        const decoded = jwt.decode(token) as JwtPayload;
        if (!decoded) {
            throw new Error('Unable to decode token');
        }
        return decoded;
    },

    // Check if a token is expired
    isTokenExpired(token: string): boolean {
        try {
            const { exp } = jwt.verify(token, config.jwt.secret) as { exp: number };
            return Date.now() >= exp * 1000;
        } catch {
            return true; // Treat any error as an expired token
        }
    },

    // Generate both access and refresh tokens
    generateTokenPair(payload: JwtPayload): { accessToken: string; refreshToken: string } {
        const accessToken = jwtUtils.generateAccessToken(payload);
        const refreshToken = jwtUtils.generateRefreshToken(payload);
        return { accessToken, refreshToken };
    },

    // Verify and refresh an access token using a refresh token
    refreshAccessToken(refreshToken: string): string {
        if (jwtUtils.isTokenExpired(refreshToken)) {
            throw new Error('Refresh token has expired');
        }

        try {
            const payload = jwtUtils.verifyToken(refreshToken);
            return jwtUtils.generateAccessToken({ id: payload.id, role: payload.role });
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    },
};

export default jwtUtils;

