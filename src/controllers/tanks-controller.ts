import { Response, NextFunction } from 'express';
import { RequestWithQuery, TankOutputDTO, TankQuery } from '../types';
import { tanksService } from '../services';

export const tanksController = {
  async getTanks(
    req: RequestWithQuery<TankQuery>,
    res: Response<TankOutputDTO[]>,
    next: NextFunction
  ) {
    try {
      const tanks = await tanksService.getTanks(req.query);
      res.json(tanks);
    } catch (error) {
      next(error);
    }
  },
};
