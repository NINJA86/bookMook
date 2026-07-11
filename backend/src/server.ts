import dotenv from 'dotenv';
dotenv.config();

import express, { Express, Request, Response, NextFunction } from 'express';
import commentRouter from './routes/comment.route';
import bookRouter from './routes/book.route';
import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';
import cookieParser from 'cookie-parser';
import sequelize, { connectToDb } from './lib/db';
import './model/index';

const cors = require('cors');
const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

app.use('/api/book', bookRouter);
app.use('/api/comment', commentRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// error handler سراسری - باید بعد از همه‌ی route ها باشه
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('🔥 Error caught:', {
    message: err.message,
    sqlMessage: err.parent?.sqlMessage,
    code: err.parent?.code,
    sql: err.sql,
  });
  res.status(500).json({ message: 'internal server error' });
});

const startServer = async (): Promise<void> => {
  await connectToDb();
  await sequelize.sync();
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

startServer().catch((error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});