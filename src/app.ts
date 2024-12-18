import express from "express";

import cors from "cors";
import config from "./config/config";
import {json} from "./middleware/validator";
import routesV1 from "./routes/v1/index";
import {errorHandler, NotFoundError} from "./utils/errors";
import authLimiter from "./utils/ratelimiter";

const app = express();

app.use(cors());
app.use(json);
app.use(express.urlencoded({extended: true}));

app.get("/", (_req, res) => {
    res.send("Welcome to QuizHive API. Please refer to the documentation for proper usage");
});

// limit repeated failed requests to auth endpoints
if (config.env === "production") {
    app.use("/api/v1/auth", authLimiter);
}

app.use("/api/v1/", routesV1);
app.use((_req, _res, next) => next(new NotFoundError()));
app.use(errorHandler);

export default app;
