import { Router, Request, Response, NextFunction } from 'express';
import * as mongoose from 'mongoose';

import { storeRoutesFactory } from './store';
import { userRoutesFactory } from './user';
import { lineRoutesFactory } from './line';
import { IStorage } from '../utils/storage';

const { name, version } = require('../../package.json');

enum DBReadyState {
  disconnected = 0,
  connected,
  connecting,
  disconnecting
}

export function routesFactorey(app: IStorage, conn: mongoose.Connection) {
  const router = Router();

  router.all('/', index);
  router.use(storeRoutesFactory(app));
  router.use(userRoutesFactory(app));
  router.use(lineRoutesFactory(app));

  function index(req: Request, res: Response, next: NextFunction) {
    res.json({ name, version, data: new Date().toISOString(), dbStatus: DBReadyState[conn.readyState] });
  }

  return router;
}
