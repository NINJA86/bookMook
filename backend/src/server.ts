import express, { Express } from 'express';
import commentRouter from './routes/comment.route';
import bookRouter from './routes/book.route';
import connectDb from './lib/db';
import './model/index';

const cors = require('cors');
const app: Express = express();
const port: number = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use('/api/book', bookRouter);

app.use('/api/comment', commentRouter);

const startServer = async (): Promise<void> => {
  await connectDb();

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

startServer();
