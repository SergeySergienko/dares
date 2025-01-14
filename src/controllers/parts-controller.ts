import { Request, Response, NextFunction } from 'express';
import { partCollection } from '../config/db';

export const partsController = {
  async getParts(req: Request, res: Response, next: NextFunction) {
    try {
      const parts = await partCollection.find({}).toArray();
      res.json(parts);
    } catch (error) {
      next(error);
    }
  },
};
