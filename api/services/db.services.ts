'use strick';

import faker from 'faker';

import Bonuses, { BonusesAttributes } from '../model/bonuses';
import User from '../model/users';
import UserBonuses from '../model/users_bonuses';

class DBServices {
  constructor() {
    this.initTables();
  }

  private initTables = async () => {
    Bonuses;
    User;
    UserBonuses;
  };

  public getListBonuses = async (): Promise<BonusesAttributes[]> => {
    try {
      return await Bonuses?.findAll({
        include: [
          {
            model: User,
            as: 'users',
            attributes: ['name', 'points', 'uuid'],
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  };

  public getListUserByBonus = async (value: object = {}): Promise<BonusesAttributes> => {
    try {
      return await Bonuses?.findOne({
        where: { ...value },
        include: [
          {
            model: User,
            as: 'users',
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  };

  public creatListUsers = async (count: number = 100): Promise<void> => {
    try {
      for (let index = 0; index < count; index++) {
        await User.create({
          name: faker.name.findName(),
          points: Math.random() * (100 - 1) + 1,
        });
      }
    } catch (error) {
      throw error;
    }
  };

  public creatListBonuses = async (count: number = 110): Promise<void> => {
    try {
      for (let index = 0; index < count; index++) {
        await Bonuses.create({
          title: faker.commerce.productName(),
          points: Math.random() * (100 - 1) + 1,
        });
      }
    } catch (error) {
      throw error;
    }
  };
}

export default new DBServices();
