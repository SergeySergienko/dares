import express from 'express';
import 'dotenv/config';
import path from 'path';
import { connectDB } from './config/db';
import partRouter from './routes/parts';
import tankRouter from './routes/tanks';
import maintenanceRouter from './routes/maintenance';

const app = express();
app.use(express.static(path.join(__dirname, 'public'))).use(express.json());

app
  .use('/api/parts', partRouter)
  .use('/api/tanks', tankRouter)
  .use('/api/maintenance', maintenanceRouter);

export const initializeApp = async () => {
  const db = await connectDB();
  app.locals.db = db;
  return app;
};
