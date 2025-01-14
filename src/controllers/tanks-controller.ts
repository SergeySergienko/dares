import { Request, Response, NextFunction } from 'express';
import { tankCollection } from '../config/db';

export const tanksController = {
  async getTanks(req: Request, res: Response, next: NextFunction) {
    try {
      const tanks = await tankCollection.find({}).toArray();
      res.json(tanks);
    } catch (error) {
      next(error);
    }
  },
};
