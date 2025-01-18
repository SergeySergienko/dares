import { Response, NextFunction } from 'express';
import {
  MaintenanceInputDTO,
  MaintenanceOutputDTO,
  MaintenanceQuery,
  RequestWithBody,
  RequestWithQuery,
} from '../types';
import { maintenanceService } from '../services';

export const maintenanceController = {
  async getMaintenanceList(
    req: RequestWithQuery<MaintenanceQuery>,
    res: Response<MaintenanceOutputDTO[]>,
    next: NextFunction
  ) {
    try {
      const maintenanceList = await maintenanceService.getMaintenanceList(
        req.query
      );
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
