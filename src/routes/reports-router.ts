import { Router } from 'express';
import { reportsController, inspectionController } from '../controllers';

export const reportsRouter = Router();

reportsRouter.get(
  '/maintenance/partsUsage',
  reportsController.generatePartsUsageReport
);

reportsRouter.get(
  '/inspection/evaluationForm/:inspectionId/:tankId',
  reportsController.generateInspectionReport
);
