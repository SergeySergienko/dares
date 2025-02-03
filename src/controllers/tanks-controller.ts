import { Response, NextFunction } from 'express';
import {
  RequestWithBody,
  RequestWithQuery,
  TankOutputDTO,
  TankQuery,
  TankUpdateDTO,
} from '../types';
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
  async updateTank(
    req: RequestWithBody<TankUpdateDTO>,
    res: Response<TankOutputDTO>,
    next: NextFunction
  ) {
    try {
      const tank = await tanksService.updateTank(req.body);

      res.status(201).json(tank);
    } catch (error) {
      next(error);
    }
  },
};
