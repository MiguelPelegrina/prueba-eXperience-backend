import express from "express";
import { UserController } from "./userController";

const router = express.Router();

// TODO Better HTTP practices
/**
 * @route GET /users
 * @desc Fetch users with optional filtering & pagination
 */
router.get("/users", UserController.getUsersByCriteria);

export default router;