import { ObjectId } from 'mongodb';
import { ApiError } from '../exceptions/api-error';
import { InspectionModel } from '../models';
import { InspectionInputDTO, InspectionQuery } from '../types';
import { inspectionModelMapper, normalizeInspectionData } from '../utils';
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

  async createInspection({
    date,
    tankId,
    tankVerdict,
    ...rest
  }: InspectionInputDTO) {
    const normalizedData = normalizeInspectionData(rest);

    const newInspection: InspectionModel = {
      ...normalizedData,
      date: new Date(date),
      tankId: ObjectId.createFromHexString(tankId),
      tankVerdict,
      createdAt: new Date(),
    };
    const { insertedId } = await inspectionRepo.createInspection(newInspection);
    if (!insertedId)
      throw ApiError.ServerError(
        'Failed to create inspection record. Please try again later.'
      );

    // Update the tank's last inspection date if the new inspection date is later
    const [tank] = await tanksService.getTanks({ id: tankId });
    if (
      new Date(newInspection.date).getTime() >
      new Date(tank.lastInspectionDate).getTime()
    ) {
      await tanksService.updateTank({
        id: tankId,
        lastInspectionDate: newInspection.date,
      });
    }

    return inspectionModelMapper({ ...newInspection, _id: insertedId });
  },
};
