import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import config from "../config/config";
import logger from "./logger";
import mongoose from "mongoose";

export class ApiError extends Error {
    public status: number;
    public isOperational: boolean;
    public override stack?: string;

    constructor(status: number, isOperational = true, message: string, stack = "") {
        super(message);
        this.status = status;
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export class BadRequestError extends ApiError {
    constructor(message: string = "Bad Request", isOperational: boolean = true, stack: string = "") {
        super(400, isOperational, message, stack);
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message: string = "Unauthorized", isOperational: boolean = true, stack: string = "") {
        super(401, isOperational, message, stack);
    }
}

export class ForbiddenError extends ApiError {
    constructor(message: string = "Forbidden", isOperational: boolean = true, stack: string = "") {
        super(403, isOperational, message, stack);
    }
}

export class NotFoundError extends ApiError {
    constructor(message: string = "Not Found", isOperational: boolean = true, stack: string = "") {
        super(404, isOperational, message, stack);
    }
}

export class ConflictError extends ApiError {
    constructor(message: string = "Conflict", isOperational: boolean = true, stack: string = "") {
        super(409, isOperational, message, stack);
    }
}

export class InternalServerError extends ApiError {
    constructor(message: string = "Internal Server Error", stack: string = "") {
        super(500, false, message, stack);
    }
}

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    const msg = err.message || err.msg || "Something went wrong";

    // Convert Error to ApiError If Needed
    if (!(err instanceof ApiError))
        err = (err instanceof mongoose.Error) ? new BadRequestError(err.stack) : new InternalServerError(err.stack);

    err.message = msg;

    let {status, message} = err;
    if (config.env === "production" && !err.isOperational) {
        status = StatusCodes.INTERNAL_SERVER_ERROR;
        message = "Internal Server Error";
    }

    res.locals.errorMessage = err.message;

    const response = {
        code: status,
        message,
        ...(config.env === "development" && {stack: err.stack}),
    };

    if (config.env === "development") {
        logger.error(`${status} - ${err.message} - ${_req.originalUrl} - ${_req.method} - ${_req.ip}`);
    }

    res.status(status).send(response);
};
