'use strict';

import path from 'path';

import hbs from 'hbs';
hbs.registerPartials(path.join(__dirname, '../views/partials'));

import { TErorr } from 'api/types/types';
//routers
import bonusesRouter from './bonuses.router';

export default server => {
  server.set('views engine', 'hbs');
  server.engine('html', require('hbs').__express);

  server.use('/', bonusesRouter);

  server.use((req, res, next) => {
    const error: TErorr = new Error('Resource not found');
    error.code = 404;
    next(error);
  });

  server.use((err, req, res, next) => {
    const code = err.code || err.status || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(code).json({ message });
  });
};
