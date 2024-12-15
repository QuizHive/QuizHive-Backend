import mongoose from "mongoose";
import logger from "./logger";

export default async function initConnection(url: string, options: mongoose.ConnectOptions) {
    const connectWithRetry = async () => {
        try {
            await mongoose.connect(url, options);
            logger.info("Connected to MongoDB");
        } catch (err) {
            logger.error(`MongoDB connection error: ${err}`);
            setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
        }
    };

    await connectWithRetry();

    mongoose.connection.on("error", (err) => {
        logger.error(`MongoDB connection error: ${err}`);
        process.exit(1);
    });
    mongoose.connection.on("disconnected", () => {
        logger.info("MongoDB disconnected");
        process.exit(1);
    });
    mongoose.connection.on("reconnected", () => {
        logger.info("MongoDB reconnected");
    });
    mongoose.connection.on("reconnectFailed", () => {
        logger.error("MongoDB reconnect failed");
        process.exit(1);
    });
    process.on("SIGINT", async () => {
        await mongoose.connection.close();
        process.exit(0);
    });
}
