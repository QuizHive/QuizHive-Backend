import express from "express";

import config from "./config/config";
import {json} from "./middleware/validator";
import routesV1 from "./routes/v1/index";
import {errorHandler, NotFoundError} from "./utils/errors";
import authLimiter from "./utils/ratelimiter";
import userRoutes from "./routes/v1/userRoutes";

const app = express();

// Middleware to parse JSON and URL-encoded requests
app.use(json);
app.use(express.urlencoded({extended: true}));

// Default API root route
app.get("/", (_req, res) => {
    res.send("Welcome to QuizHive API. Please refer to the documentation for proper usage");
});

// limit repeated failed requests to auth endpoints
if (config.env === "production") {
    app.use("/api/v1/auth", authLimiter);
}

// Add user routes explicitly
app.use("/api/v1/users", userRoutes);

// Mount version 1 API routes
app.use("/api/v1/", routesV1);

// Catch-all route for undefined endpoints
app.use((_req, _res, next) => next(new NotFoundError()));

// Global error handler
app.use(errorHandler);

export default app;
