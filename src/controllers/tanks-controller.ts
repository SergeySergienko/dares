import { Request, Response, NextFunction } from 'express';

export const tanksController = {
  async getTanks(req: Request, res: Response, next: NextFunction) {
    try {
      const db = req.app.locals.db;
      const tanks = await db.collection('tanks').find({}).toArray();
      res.json(tanks);
    } catch (error) {
      next(error);
    }
  },
};
