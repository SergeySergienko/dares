import { Router } from 'express';
import { reportsController } from '../controllers';

export const reportsRouter = Router();

reportsRouter.get(
  '/maintenance/partsUsage',
  reportsController.generatePartsUsageReport
);

reportsRouter.get(
  '/inspection/generate/:inspectionId/:tankId',
  reportsController.generateInspectionReport
);

reportsRouter.get(
  '/inspection/generateLast/:tankId',
  reportsController.generateLastInspectionReport
);
