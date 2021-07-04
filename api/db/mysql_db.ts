'use strick';

import config from '../config';
import { TErorr } from 'api/types/types';
import { Sequelize } from 'sequelize';

const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE } = config;

const db = (): Sequelize | any => {
  try {
    const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
      dialect: 'mysql',
      logging: false,
      host: MYSQL_HOST,
      port: Number(MYSQL_PORT),
      define: {
        timestamps: false,
      },
    });

    if (sequelize) {
      console.log('\x1b[33m%s\x1b[0m', '>>> Database connection successful');
    }

    return sequelize;
  } catch (error) {
    const err: TErorr = new Error('Not connect db');
    err.code = 500;
    return err;
  }
};

export default db();
