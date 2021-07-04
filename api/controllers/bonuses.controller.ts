'use strict';

import BonusesServices from '../services/bonuses.services';
import DBServices from '../services/db.services';

export default class BonusesController {
  static async getRoulette(req, res, next) {
    try {
      const bonuses = await DBServices.getListBonuses();

      return res.render('index.hbs', { bonuses });
    } catch (error) {
      next(error);
    }
  }

  static async getUsersList(req, res, next) {
    try {
      const bonus = await DBServices.getListUserByBonus(req.query);

      return res.render('usersList.hbs', { bonus });
    } catch (error) {
      next(error);
    }
  }

  static async roulette(req, res, next) {
    try {
      await BonusesServices.roulette();

      res.redirect('/');
    } catch (error) {
      next(error);
    }
  }
}
