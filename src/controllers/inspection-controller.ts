import { NextFunction, Response } from 'express';
import {
  InspectionOutputDTO,
  InspectionQuery,
  RequestWithQuery,
} from '../types';
import { inspectionService } from '../services';

export const inspectionController = {
  async getInspectionList(
    req: RequestWithQuery<InspectionQuery>,
    res: Response<InspectionOutputDTO[]>,
    next: NextFunction
  ) {
    try {
      const inspectionList = await inspectionService.getInspectionList(
        req.query
      );
      res.json(inspectionList);
    } catch (error) {
      next(error);
    }
  },
};
