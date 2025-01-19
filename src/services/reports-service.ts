import { ApiError } from '../exceptions/api-error';
import { InspectionReportInputDTO } from '../types';
import { inspectionService } from './inspection-service';
import { tanksService } from './tanks-service';

export const reportsService = {
  async generateInspectionReport({
    inspectionId,
    tankId,
  }: InspectionReportInputDTO) {
    const [inspection] = await inspectionService.getInspectionList({
      id: inspectionId,
    });
    const [tank] = await tanksService.getTanks({ id: tankId });

    if (!inspection || !tank) {
      throw ApiError.NotFound('Inspection or tank not found');
    }

    if (inspection.tankId !== tank.id) {
      throw ApiError.UnprocessableEntity('Inspection and tank do not match');
    }

    const report = {
      date: inspection.date,
      tankVerdict: inspection.tankVerdict,
      tank,
    };

    return report;
  },
};
