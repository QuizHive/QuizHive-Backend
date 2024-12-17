import express, { Router } from "express";
import swaggerUi from "swagger-ui-express";
import config from "../../config/config";
import authRoute from "./authRoutes";
import {swaggerUISetup} from "./swagger";
import userRoute from "./userRoutes";
import questionRoutes from "./questionRoutes";

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/questions",
    route: questionRoutes,
  },
];

const devIRoute: IRoute[] = [
  // IRoute available only in development mode
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === "development") {
  devIRoute.forEach((route) => {
    router.use(route.path, route.route);
  });
}

router.use("/docs", swaggerUi.serve, swaggerUISetup());

export default router;
