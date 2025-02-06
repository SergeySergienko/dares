import { ObjectId } from 'mongodb';
import { ApiError } from '../exceptions/api-error';
import { Grade, InspectionModel } from '../models';
import {
  InspectionInputDTO,
  InspectionQuery,
  InspectionReportInputDTO,
} from '../types';
import {
  inspectionModelMapper,
  isValidGrade,
  normalizeInspectionData,
  parseGrade,
} from '../utils';
import { inspectionRepo } from '../repositories';
import { tanksService } from '.';

export const inspectionService = {
  async getInspectionList(queryObject: InspectionQuery) {
    const inspectionList = await inspectionRepo.getInspectionList(queryObject);
    if (!inspectionList) {
      throw ApiError.ServerError('Failed to fetch inspection records.');
    }

    return inspectionList.map(inspectionModelMapper);
  },

  async getInspectionByTankNumber({ tankNumber }: InspectionReportInputDTO) {
    const [tank] = await tanksService.getTanks({ internalNumber: tankNumber });

    const [lastInspection] = await inspectionService.getInspectionList({
      tankNumber,
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

  async createInspection({
    date,
    tankId,
    tankVerdict,
    tankNumber,
    grade: gradeStringValue,
    ...rest
  }: InspectionInputDTO) {
    const normalizedData = normalizeInspectionData(rest);

    let grade: Grade | undefined;
    if (gradeStringValue && isValidGrade(+gradeStringValue)) {
      grade = parseGrade(gradeStringValue);
    }

    const newInspection: InspectionModel = {
      ...normalizedData,
      date: new Date(date),
      tankId: ObjectId.createFromHexString(tankId),
      tankNumber: Number(tankNumber),
      tankVerdict,
      grade,
      createdAt: new Date(),
    };
    const { insertedId } = await inspectionRepo.createInspection(newInspection);
    if (!insertedId)
      throw ApiError.ServerError(
        'Failed to create inspection record. Please try again later.'
      );

    // Update the tank's data if the new inspection date is later
    const [tank] = await tanksService.getTanks({ id: tankId });
    if (
      new Date(newInspection.date).getTime() >
      new Date(tank.lastInspectionDate).getTime()
    ) {
      await tanksService.updateTank({
        id: tankId,
        grade: newInspection.grade,
        lastInspectionDate: newInspection.date,
        valve: newInspection.valve?.type,
      });
    }

    return inspectionModelMapper({ ...newInspection, _id: insertedId });
  },
};
