'use strick';

import { connectionDB } from '../db';
import { Model, DataTypes, Optional } from 'sequelize';

export interface UserAttributes {
  id: number;
  name: string;
  points: number;
  uuid?: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  id: number;
  name: string;
  points: number;
  uuid?: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
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
    modelName: 'user',
  },
);

export default User;
