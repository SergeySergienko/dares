import express from 'express';
import 'dotenv/config';
import path from 'path';
import { connectDB } from './config/db';
import {
  maintenanceRouter,
  partsRouter,
  reportsRouter,
  tanksRouter,
} from './routes';

const app = express();
app.use(express.static(path.join(__dirname, 'public'))).use(express.json());

app
  .use('/api/maintenance', maintenanceRouter)
  .use('/api/parts', partsRouter)
  .use('/api/reports', reportsRouter)
  .use('/api/tanks', tanksRouter);

export const initializeApp = async () => {
  const db = await connectDB();
  app.locals.db = db;
  return app;
};
