'use strick';

import { connectionDB } from '../db';
import Bonuses from './bonuses';
import Users from './users';

import { Model, DataTypes, Optional, Association } from 'sequelize';

export interface UsersBonusesAttributes {
  id: number;
  u_uuid?: string;
  b_uuid?: string;
}

export interface UsersBonusesCreationAttributes extends Optional<UsersBonusesAttributes, 'id'> {}

class UsersBonuses
  extends Model<UsersBonusesAttributes, UsersBonusesCreationAttributes>
  implements UsersBonusesAttributes {
  id: number;
  u_uuid?: string;
  b_uuid?: string;
}

UsersBonuses.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    u_uuid: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    b_uuid: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize: connectionDB,
    modelName: 'users_bonuses',
  },
);

Bonuses.belongsToMany(Users, {
  as: 'users',
  through: UsersBonuses,
});

Users.belongsToMany(Bonuses, {
  as: 'bonus',
  through: UsersBonuses,
});

UsersBonuses.belongsTo(Bonuses);
Bonuses.hasMany(UsersBonuses);
UsersBonuses.belongsTo(Users);
Users.hasMany(UsersBonuses);

export default UsersBonuses;
