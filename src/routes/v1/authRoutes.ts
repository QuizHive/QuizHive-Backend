import express from "express";
import authController from "../../controller/authController";
import validator from "../../middleware/validator";
import {forgetReqSchema, loginSchema, refreshTokenSchema, registerSchema} from "../../schemas/authSchemas";

const router = express.Router();

// auth routes
router.post("/register", validator(registerSchema), authController.register);
router.post("/login", validator(loginSchema), authController.login);
router.post("/refresh-token", validator(refreshTokenSchema), authController.refreshToken);
// router.post("/forget-code-request", validator(forgetReqSchema), authController.forgetPassword);
// router.post("/reset-password", validator(resetPassSchema), authController.resetPassword);

export default router;