'use strick';

import { connectionDB } from '../db';

import { Model, DataTypes, Optional } from 'sequelize';

export interface BonusesAttributes {
  id: number;
  title: string;
  points: number;
  uuid?: string;
}

export interface BonusesCreationAttributes extends Optional<BonusesAttributes, 'id'> {}

class Bonuses
  extends Model<BonusesAttributes, BonusesCreationAttributes>
  implements BonusesAttributes {
  id: number;
  title: string;
  points: number;
  uuid?: string;
}

Bonuses.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  {
    sequelize: connectionDB,
    modelName: 'bonuses',
  },
);

export default Bonuses;
