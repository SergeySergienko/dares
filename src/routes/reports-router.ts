import { Router } from 'express';
import { reportsController } from '../controllers';

export const reportsRouter = Router();

reportsRouter.get('/', reportsController.generatePartUsageReport);
