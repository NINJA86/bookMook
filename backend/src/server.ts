import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
import commentRouter from './routes/comment.route';
import bookRouter from './routes/book.route';
import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';

import cookieParser from 'cookie-parser';
import connectDb from './lib/db';
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
const startServer = async (): Promise<void> => {
  await connectDb();

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

startServer();
