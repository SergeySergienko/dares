import { ApiError } from '../exceptions/api-error';
import { inspectionRepo } from '../repositories/inspection-repo';
import { InspectionQuery } from '../types';
import { inspectionModelMapper } from '../utils';

export const inspectionService = {
  async getInspectionList(queryObject: InspectionQuery) {
    const inspectionList = await inspectionRepo.getInspectionList(queryObject);
    if (!inspectionList) {
      throw ApiError.ServerError('Failed to fetch inspection records.');
    }

    return inspectionList.map(inspectionModelMapper);
  },
};
