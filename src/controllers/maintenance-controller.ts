import { Request, Response, NextFunction } from 'express';

export const maintenanceController = {
  async getMaintenanceList(req: Request, res: Response, next: NextFunction) {
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
  },
};
