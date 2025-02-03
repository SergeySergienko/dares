import { ApiError } from '../exceptions/api-error';
import { InspectionQuery, InspectionReportInputDTO } from '../types';
import { inspectionService, tanksService } from '.';
import { isInternalNumber, isTankId } from '../utils';

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

  async getLastInspectionByTankIdentifier({
    tankIdentifier,
    inspectionId,
  }: InspectionReportInputDTO) {
    if (!tankIdentifier) {
      throw ApiError.BadRequest(400, 'tankIdentifier is required');
    }

    let tankQueryObject;
    if (isTankId(tankIdentifier)) {
      tankQueryObject = { id: tankIdentifier };
    } else if (isInternalNumber(tankIdentifier)) {
      tankQueryObject = { internalNumber: tankIdentifier };
    } else {
      throw ApiError.BadRequest(400, 'Invalid tankIdentifier format');
    }
    const [tank] = await tanksService.getTanks(tankQueryObject);

    let inspectionQueryObject:
      | { id: string }
      | {
          tankId: string;
          sortBy: InspectionQuery['sortBy'];
          sortOrder: InspectionQuery['sortOrder'];
        }
      | {
          tankNumber: string;
          sortBy: InspectionQuery['sortBy'];
          sortOrder: InspectionQuery['sortOrder'];
        };

    if (inspectionId) {
      inspectionQueryObject = {
        id: inspectionId,
      };
    } else if (isTankId(tankIdentifier)) {
      inspectionQueryObject = {
        tankId: tankIdentifier,
        sortBy: 'date',
        sortOrder: 'desc',
      };
    } else {
      inspectionQueryObject = {
        tankNumber: tankIdentifier,
        sortBy: 'date',
        sortOrder: 'desc',
      };
    }
    const [inspection] = await inspectionService.getInspectionList(
      inspectionQueryObject
    );

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
};
