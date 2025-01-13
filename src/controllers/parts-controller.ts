import { Request, Response, NextFunction } from 'express';

export const partsController = {
  async getParts(req: Request, res: Response, next: NextFunction) {
    try {
      const db = req.app.locals.db;
      const parts = await db.collection('parts').find({}).toArray();
      res.json(parts);
    } catch (error) {
      next(error);
    }
  },
};
