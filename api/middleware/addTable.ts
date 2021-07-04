'use strick';

import DBServices from '../services/db.services';

export default () => {
  try {
    DBServices.creatListBonuses(110);
    DBServices.creatListUsers(10000);
  } catch (error) {
    throw error;
  }
};
