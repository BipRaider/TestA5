'use strict';

//app server
import express from 'express';
import logger from 'morgan';

//configs

import env from './config';

//database

import { connectionDB } from './db';

//routers
import router from './router';

//middleware
import middleware from './middleware';
import addTable from './middleware/addTable';

export default class Server {
  server: any;

  constructor() {
    this.server = null;
  }

  async start() {
    await this.initDB();
    this.initServer();
    this.initLogger();
    this.initMiddleware();
    this.initRoutes();
    return this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initLogger() {
    if (env.NODE_ENV === 'dev') {
      this.server.use(logger('dev'));
    }
  }

  initMiddleware() {
    middleware(this.server);
  }

  initRoutes() {
    router(this.server);
  }

  async initDB() {
    try {
      await connectionDB?.drop();
      await connectionDB?.sync({ force: true });
      addTable();
    } catch (error) {
      console.log('\x1b[36m%s\x1b[0m', `>>> db is not connect`);
      process.exit(1);
    }
  }

  startListening() {
    try {
      return this.server.listen(env.PORT, () => {
        console.log('\x1b[36m%s\x1b[0m', `>>> Server started listening on port ${env.PORT}`);
      });
    } catch (error) {
      console.log('\x1b[36m%s\x1b[0m', `>>> Server did not start listening on port ${env.PORT}`);
    }
  }
}
