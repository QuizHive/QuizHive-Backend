import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import {Schema} from "joi";

export default function validator(schema: Schema) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {error} = schema.validate(req.body, {abortEarly: false});
        if (!error) {
            next();
            return;
        }
        const errorMessages = error?.details.map((detail) => detail.message);
        res.status(StatusCodes.BAD_REQUEST).json({message: errorMessages});
    };
}
