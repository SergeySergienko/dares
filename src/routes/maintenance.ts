import { Router, Request, Response, NextFunction } from 'express';

const maintenanceRouter = Router();

maintenanceRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const db = req.app.locals.db;
      const maintenanceList = await db
        .collection('maintenance')
        .find({})
        .toArray();
      res.json(maintenanceList);
    } catch (error) {
      next(error);
    }
  }
);

export default maintenanceRouter;
