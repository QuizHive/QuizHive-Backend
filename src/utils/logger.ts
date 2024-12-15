import {createLogger, format, transports} from "winston";
const {combine, timestamp, printf, colorize, errors} = format;
import fs from "fs";
import path from "path";
import DailyRotateFile from "winston-daily-rotate-file";
import config from "../config/config";

let dir = config.logDir;
if (!dir) dir = path.resolve("logs");

// create directory if it is not present
if (!fs.existsSync(dir)) {
    // Create the directory if it does not exist
    fs.mkdirSync(dir);
}

const logLevel = config.env === "development" ? "debug" : "warn";

const dailyRotateFile = new DailyRotateFile({
    level: logLevel,
    filename: dir + "/%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    handleExceptions: true,
    maxSize: "20m",
    maxFiles: "14d",
    format: combine(
        errors({stack: true}),
        timestamp(),
        format.json(),
    ),
});

const logFormat = printf(({level, message, timestamp, stack}) => {
    return `${timestamp} ${level}: ${stack || message}`;
});

export default createLogger({
    transports: [
        new transports.Console({
            level: logLevel,
            format: combine(
                colorize(),
                timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
                errors({stack: true}),
                logFormat,
            ),
        }),
        dailyRotateFile,
    ],
    exceptionHandlers: [dailyRotateFile],
    exitOnError: false, // do not exit on handled exceptions
});
