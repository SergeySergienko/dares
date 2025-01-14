import { Request, Response, NextFunction } from 'express';
import {
  MaintenanceInputDTO,
  MaintenanceOutputDTO,
  RequestWithBody,
} from '../types';
import { maintenanceService } from '../services';
import { maintenanceCollection } from '../config/db';

export const maintenanceController = {
  async getMaintenanceList(req: Request, res: Response, next: NextFunction) {
    try {
      const maintenanceList = await maintenanceCollection.find({}).toArray();
      res.json(maintenanceList);
    } catch (error) {
      next(error);
    }
  },

  async createMaintenance(
    req: RequestWithBody<MaintenanceInputDTO>,
    res: Response<MaintenanceOutputDTO>,
    next: NextFunction
  ) {
    try {
      const maintenance = await maintenanceService.createMaintenance(req.body);

      res.status(201).json(maintenance);
    } catch (error) {
      next(error);
    }
  },
};
