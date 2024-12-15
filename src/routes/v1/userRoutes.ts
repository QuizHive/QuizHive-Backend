import express from "express";
import {Right} from "../../config/roles";
import userController from "../../controller/userController";
import requireAuth from "../../middleware/authMiddleware";

const router = express.Router();

router.route("/")
    .get(requireAuth([Right.GET_USERS]), userController.getAllUsers);

router.route("/:targetId")
    .patch(requireAuth([Right.MANAGE_USERS]), userController.updateUser)
    .get(requireAuth([Right.GET_USERS]), userController.getUserById)
    .delete(requireAuth([Right.MANAGE_USERS]), userController.deleteUser);

export default router;
