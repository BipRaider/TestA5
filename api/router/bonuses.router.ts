'use strict';

import { Router } from 'express';

import BonusesController from '../controllers/bonuses.controller';

const bonusesRouter = Router();

bonusesRouter.get('/', BonusesController.getRoulette);
bonusesRouter.post('/', BonusesController.roulette);

bonusesRouter.get('/:uuid', BonusesController.getUsersList);
export default bonusesRouter;
