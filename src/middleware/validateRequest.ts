import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export default function validateRequest (schema: Schema) {
    return function (req: Request, res: Response, next: NextFunction):void {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errorMessages = error.details.map((detail) => detail.message);
            res.status(400).json({ errors: errorMessages });
            return;
        }

        next();
    };
};;