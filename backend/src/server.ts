import express, { Express } from 'express';
import router from './routes/book.route';
import connectDb from './lib/db';
const app: Express = express();
const port = 3000;

app.use('/api/book', router);

const startServer = async (): Promise<void> => {
  await connectDb();

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

startServer();
