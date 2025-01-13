import { Router } from 'express';
import { maintenanceController } from '../controllers';

export const maintenanceRouter = Router();

maintenanceRouter.get('/', maintenanceController.getMaintenanceList);
