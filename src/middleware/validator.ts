import express, {NextFunction, Request, Response} from "express";
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
        res.status(StatusCodes.BAD_REQUEST).json({messages: errorMessages});
    };
}

export const json = express.json({
    strict: true,
    type: "application/json",
    verify: (req: Request, res: Response, buf: Buffer, encoding: string) => {
        try {
            JSON.parse(buf as any);
        } catch (err) {
            res.status(StatusCodes.BAD_REQUEST).json({ messages: ["Invalid JSON format"] });
            throw new Error("Invalid JSON");
        }
    },
});