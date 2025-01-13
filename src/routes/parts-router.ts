import { Router } from 'express';
import { partsController } from '../controllers';

export const partsRouter = Router();

partsRouter.get('/', partsController.getParts);
