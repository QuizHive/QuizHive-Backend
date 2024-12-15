import express from "express";

import path from "path";
import config from "./config/config";
import routesV1 from "./routes/v1/index";
import logger from "./utils/logger";
import authLimiter from "./utils/ratelimiter";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (_req, res) => {
    res.send("Welcome to QuizHive API. Please refer to the documentation for proper usage");
});

// limit repeated failed requests to auth endpoints
if (config.env === "production") {
    app.use("/api/v1/auth", authLimiter);
}

app.use("/api/v1/", routesV1);
app.use("/docs", express.static(path.join(__dirname, "./assets/swagger")));

app.use((err: any, _req: any, res: any) => {
    logger.error(err.stack);
    res.status(500).send({message: "An internal error occurred", error: err.message});
});

export default app;
