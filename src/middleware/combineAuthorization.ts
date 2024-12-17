import { NextFunction, Request, Response } from "express";

/**
 * Utility to combine multiple middleware functions into a single middleware.
 * If one middleware fails, it stops further execution and propagates the error.
 *
 * @param middlewares Array of middleware functions
 * @returns A single middleware function
 */
export function combineAuthorization(
    ...middlewares: Array<(req: Request, res: Response, next: NextFunction) => void>
) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        for (const middleware of middlewares) {
            try {
                await new Promise<void>((resolve, reject) => {
                    middleware(req, res, (err?: any) => (err ? reject(err) : resolve()));
                });
            } catch (error) {
                return next(error); // Pass error to global error handler
            }
        }
        next();
    };
}
