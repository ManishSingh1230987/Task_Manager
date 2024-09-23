import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get('/api/v1/check-env', (req, res) => {
  res.json({
    jwtSecretDefined: !!process.env.JWT_SECRET,
    envVars: Object.keys(process.env)
  });
});

app.use('/api/v1', authRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', taskRoutes);

export default app;
