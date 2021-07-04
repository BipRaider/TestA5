'use strick';

import DBServices from '../services/db.services';

export default () => {
  try {
    DBServices.creatListBonuses(11);
    DBServices.creatListUsers(1011);
  } catch (error) {
    throw error;
  }
};
