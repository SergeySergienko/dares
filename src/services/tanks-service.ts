import { ApiError } from '../exceptions/api-error';
import { tanksRepo } from '../repositories';
import { TankQuery, TankUpdateDTO } from '../types';
import { tankModelMapper } from '../utils';

export const tanksService = {
  async getTanks(queryObject: TankQuery) {
    const tanks = await tanksRepo.getTanks(queryObject);
    if (!tanks) {
      throw ApiError.ServerError('Failed to fetch tank records.');
    }

    return tanks.map(tankModelMapper);
  },

  async updateTank(updateData: TankUpdateDTO) {
    const updatedTank = await tanksRepo.updateTank(updateData);
    if (!updatedTank) {
      throw ApiError.NotFound(`Tank with id: ${updateData.id} wasn't found`);
    }

    return tankModelMapper(updatedTank);
  },
};
