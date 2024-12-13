import mongoose from "mongoose";
import logger from "./logger";

export default function initConnection(url: string, options: mongoose.ConnectOptions) {
    mongoose.connect(url, options).then(() => {
        logger.info('Connected to MongoDB');
    });
    mongoose.connection.on('error', (err) => {
        logger.error(`MongoDB connection error: ${err}`);
    });
    mongoose.connection.on('disconnected', () => {
        logger.info('MongoDB disconnected');
    });
    mongoose.connection.on('reconnected', () => {
        logger.info('MongoDB reconnected');
    });
    mongoose.connection.on('reconnectFailed', () => {
        logger.error('MongoDB reconnect failed');
    });
    process.on('SIGINT', async () => {
        await mongoose.connection.close();
        process.exit(0);
    });
}