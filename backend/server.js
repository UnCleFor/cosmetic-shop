import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  exposedHeaders: ['set-cookie'],
}));
app.use(express.json());
app.use(cookieParser())

// Route
routes(app);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;