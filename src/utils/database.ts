import mongoose from "mongoose";
import logger from "./logger";

export default async function initConnection(url: string, options: mongoose.ConnectOptions) {
    const connectWithRetry = async () => {
        try {
            await mongoose.connect(url, options);
            logger.info("✅ Connected to MongoDB");
        } catch (err) {
            logger.error(`❌ MongoDB connection error: ${err}`);
            if (process.env.NODE_ENV !== "test") {
                setTimeout(connectWithRetry, 5000); // Retry only in production
            } else {
                throw err; // Fail fast during tests
            }
        }
    };

    await connectWithRetry();

    mongoose.connection.on("error", (err) => {
        logger.error(`❌ MongoDB connection error: ${err}`);
        if (process.env.NODE_ENV !== "test") {
            process.exit(1);
        }
    });

    mongoose.connection.on("disconnected", () => {
        logger.info("⚠️ MongoDB disconnected");
        if (process.env.NODE_ENV !== "test") {
            process.exit(1);
        }
    });

    mongoose.connection.on("reconnected", () => {
        logger.info("✅ MongoDB reconnected");
    });

    mongoose.connection.on("reconnectFailed", () => {
        logger.error("❌ MongoDB reconnect failed");
        if (process.env.NODE_ENV !== "test") {
            process.exit(1);
        }
    });

    // Clean up connection on SIGINT
    process.on("SIGINT", async () => {
        await mongoose.connection.close();
        logger.info("MongoDB connection closed due to app termination");
        process.exit(0);
    });
}
