import express from 'express';
import cors from 'cors';
import cosmeticsRouter from './api/cosmetics.route.js';
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route
app.use('/api/v1/cosmetics', cosmeticsRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "not found" });
});

export default app;