import { ObjectId } from 'mongodb';
import { ApiError } from '../exceptions/api-error';
import { InspectionModel } from '../models';
import { inspectionRepo } from '../repositories/inspection-repo';
import { InspectionInputDTO, InspectionQuery } from '../types';
import { inspectionModelMapper } from '../utils';
import { tanksService } from './tanks-service';

export const inspectionService = {
  async getInspectionList(queryObject: InspectionQuery) {
    const inspectionList = await inspectionRepo.getInspectionList(queryObject);
    if (!inspectionList) {
      throw ApiError.ServerError('Failed to fetch inspection records.');
    }

    return inspectionList.map(inspectionModelMapper);
  },

  async createInspection({ date, tankId, tankVerdict }: InspectionInputDTO) {
    const newInspection: InspectionModel = {
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

    await tanksService.updateTank({
      id: tankId,
      lastInspectionDate: new Date(date),
    });

    return inspectionModelMapper({ ...newInspection, _id: insertedId });
  },
};
