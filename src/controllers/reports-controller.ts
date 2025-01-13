import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';

export const reportsController = {
  async generatePartUsageReport(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { alias, tankId, startDate, endDate } = req.query;
      const db = req.app.locals.db;

      const pipeline: any[] = [{ $match: {} }];

      if (tankId) {
        pipeline[0].$match.tankId = ObjectId.createFromHexString(
          tankId as string
        );
      }

      if (alias) {
        pipeline.push({ $match: { [`parts.${alias}`]: { $exists: true } } });
      }

      if (startDate || endDate) {
        const dateFilter: Record<string, Date> = {};

        if (startDate) {
          dateFilter.$gte = new Date(startDate as string);
        }
        if (endDate) {
          dateFilter.$lte = new Date(endDate as string);
        }

        pipeline[0].$match.date = dateFilter;
      }

      pipeline.push(
        {
          $group: {
            _id: null,
            total: { $sum: `$parts.${alias}` },
          },
        },
        {
          $project: {
            total: 1,
            _id: 0,
          },
        }
      );

      const [report] = await db
        .collection('maintenance')
        .aggregate(pipeline)
        .toArray();

      res.json(report);
    } catch (error) {
      next(error);
    }
  },
};
