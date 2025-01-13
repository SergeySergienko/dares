import { Router } from 'express';
import { tanksController } from '../controllers';

export const tanksRouter = Router();

tanksRouter.get('/', tanksController.getTanks);
