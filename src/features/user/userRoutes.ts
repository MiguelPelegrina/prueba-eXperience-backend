import express from "express";
import { getUsersByCriteria } from "./userController";

const router = express.Router();

/**
 * @route GET /users
 * @desc Fetch users with optional filtering & pagination
 */
router.get("/users", getUsersByCriteria);

export default router;