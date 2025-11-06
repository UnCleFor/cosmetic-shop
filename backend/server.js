import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route
routes(app);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "not found" });
});

export default app;