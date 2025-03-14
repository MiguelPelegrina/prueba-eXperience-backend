"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const userRoutes_1 = __importDefault(require("./features/user/userRoutes"));
// Setup
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const router = express_1.default.Router();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
// Routes
app.use(userRoutes_1.default);
// Start Server
app.listen(PORT, () => {
    console.log(`⚡ Server running on http://localhost:${PORT}`);
});
