import { NextFunction, Response } from 'express';
import {
  InspectionInputDTO,
  InspectionOutputDTO,
  InspectionQuery,
  RequestWithBody,
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

  async createInspection(
    req: RequestWithBody<InspectionInputDTO>,
    res: Response<InspectionOutputDTO>,
    next: NextFunction
  ) {
    try {
      const inspection = await inspectionService.createInspection(req.body);

      res.status(201).json(inspection);
    } catch (error) {
      next(error);
    }
  },
};
