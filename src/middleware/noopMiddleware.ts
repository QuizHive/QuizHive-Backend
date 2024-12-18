import { NextFunction, Request, Response } from "express";

export default function noopMiddleware() {
    return (req: Request, res: Response, next: NextFunction): void => {
        next();
    };
}
