'use strick';

import Bonuses, { BonusesAttributes } from '../model/bonuses';
import User, { UserAttributes } from '../model/users';

class BonusesServices {
  bonuses: BonusesAttributes[];
  users: UserAttributes[];
  next: boolean;
  countBonuses: number;

  constructor() {
    this.bonuses = [];
    this.users = [];
    this.next = false;
  }

  public addBonus = async (user: UserAttributes, bonus): Promise<void> => {
    await bonus?.addUsers(user, {
      through: {
        u_uuid: user.uuid,
        b_uuid: bonus.uuid,
      },
    });
  };

  public addBonusesBigger = async (user: UserAttributes): Promise<void> => {
    try {
      this.next = false;

      for (let i = user.points; i < 100; i++) {
        if (this.next) break;

        for (let f = 0; f < this.bonuses.length; f++) {
          if (i === this.bonuses[f].points) {
            await this.addBonus(user, this.bonuses[f]);

            this.next = true;
            break;
          }
          this.next = false;
        }
      }
    } catch (error) {
      throw error;
    }
  };

  public addBonusesLess = async (user: UserAttributes): Promise<void> => {
    try {
      this.next = false;

      for (let i = user.points; 1 < i; i--) {
        if (this.next) break;

        for (let f = 0; f < this.bonuses.length; f++) {
          if (i === this.bonuses[f].points) {
            await this.addBonus(user, this.bonuses[f]);

            this.next = true;
            break;
          }
        }
      }
    } catch (error) {
      throw error;
    }
  };

  public addBonuses = async (user: UserAttributes): Promise<void> => {
    try {
      this.next = false;

      this.bonuses.forEach(async bonus => {
        if (user.points === bonus.points) {
          this.next = true;

          await this.addBonus(user, bonus);
        }
      });

      if (this.next) return;

      await this.addBonusesBigger(user);

      if (this.next) return;

      await this.addBonusesLess(user);
    } catch (error) {
      throw error;
    }
  };

  private addBonusesUsers = async () => {
    try {
      await this.users.forEach(async user => {
        await this.addBonuses(user);
      });
    } catch (error) {
      throw error;
    }
  };

  public roulette = async (): Promise<void> => {
    try {
      this.bonuses = await Bonuses.findAll({ order: [['points', 'DESC']] });
      this.users = await User.findAll();

      await this.addBonusesUsers();
    } catch (error) {
      throw error;
    }
  };
}

export default new BonusesServices();
