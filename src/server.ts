import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import userRoutes from './features/user/userRoutes';

// Setup
const app = express();
const PORT = process.env.PORT || 3000;
const router = express.Router();

// Middleware
app.use(express.json());
app.use(cors())
app.use(morgan('dev'));

// Routes
app.use(userRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`⚡ Server running on http://localhost:${PORT}`);
});
