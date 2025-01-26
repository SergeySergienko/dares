import { ApiError } from '../exceptions/api-error';
import { InspectionReportInputDTO } from '../types';
import { inspectionService, tanksService } from '.';

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
      ...inspection,
      tank,
    };

    return report;
  },

  async generateLastInspectionReport({ tankId }: InspectionReportInputDTO) {
    const [tank] = await tanksService.getTanks({ id: tankId });

    const [lastInspection] = await inspectionService.getInspectionList({
      tankId,
      sortBy: 'date',
      sortOrder: 'desc',
    });

    if (!lastInspection || !tank) {
      throw ApiError.NotFound('Inspection or tank not found');
    }

    const report = {
      ...lastInspection,
      tank,
    };

    return report;
  },
};
