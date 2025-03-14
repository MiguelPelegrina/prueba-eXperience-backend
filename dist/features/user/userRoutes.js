"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("./userController");
const router = express_1.default.Router();
/**
 * @route GET /users
 * @desc Fetch users with optional filtering & pagination
 */
router.get("/users", userController_1.getUsersByCriteria);
exports.default = router;
