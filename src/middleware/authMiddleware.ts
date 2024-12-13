import { Request, Response, NextFunction } from 'express';
import jwtUtils from '../utils/jwt';

export default function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization?.split(' ')[1]; // Expecting "Bearer <token>"

    if (!token) {
        res.status(401).json({ message: 'Access token required' });
        return;
    }

    try {
        // Verify the token and extract the payload
        const decoded = jwtUtils.verifyToken(token);

        // Attach the decoded token payload to a temporary property
        Object.assign(req, { user: { id: decoded.id, role: decoded.role } });
        next();
    } catch (error: any) {
        if (error.message === 'Token has expired')
            res.status(401).json({ message: 'Access token expired' });
        else
            res.status(403).json({ message: 'Invalid token' });
    }
}
