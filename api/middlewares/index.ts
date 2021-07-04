'use strict';

import express from 'express';
import cors from 'cors';
import env from '../config';

export default server => {
  server.use(express.urlencoded());
  server.use(express.json());
  server.use(cors({ origin: env.corsUrl }));
  server.disable('x-powered-by');
};
