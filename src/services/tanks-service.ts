import { ApiError } from '../exceptions/api-error';
import { tanksRepo } from '../repositories';
import { TankQuery } from '../types';
import { tankModelMapper } from '../utils';

export const tanksService = {
  async getTanks(queryObject: TankQuery) {
    const tanks = await tanksRepo.getTanks(queryObject);
    if (!tanks) {
      throw ApiError.ServerError('Failed to fetch tank records.');
    }

    return tanks.map(tankModelMapper);
  },
};
