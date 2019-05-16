import { Router, Request, Response, NextFunction } from 'express';

import { storeRoutesFactory } from './store';
import { lineRoutesFactory } from './line';

export function routesFactorey(app) {
  const router = Router();

  router.all('/', index);
  router.use(storeRoutesFactory(app));
  router.use(lineRoutesFactory(app));

  function index(req: Request, res: Response, next: NextFunction) {
    res.json({ data: new Date().toISOString() });
  }

  return router;
}
