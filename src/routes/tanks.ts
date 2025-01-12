import { Router, Request, Response, NextFunction } from 'express';

const tankRouter = Router();

tankRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const db = req.app.locals.db;
    const tanks = await db.collection('tanks').find({}).toArray();
    res.json(tanks);
  } catch (error) {
    next(error);
  }
});

export default tankRouter;
