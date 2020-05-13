import { Router, Request, Response, NextFunction, Express } from 'express';

import { HttpError } from '../utils';
import { IModel } from '../models';

export function storeRoutesFactory(app: Express) {
  const router = Router();
  const { Store } = app.get('model') as IModel;

  router.get('/stores', readStores);
  router.post('/stores', createStores);
  router.get('/stores/:sid', readStore);
  router.patch('/stores/:sid', updateStore);
  router.delete('stores/:sid', removeStore);

  function readStores(req: Request, res: Response, next: NextFunction) {
    const { limit: limitStr, skip: skipStr } = req.query;

    const conditions: any = {};
    const options: any = {};
    const limit = parseInt(limitStr, 10);
    const skip = parseInt(skipStr, 10);

    options.limit = Math.min(Math.min(limit, Infinity) || 50, 50);
    options.skip = Math.max(Math.min(skip, Infinity) || 0, 0);

    Store.find(conditions, null, options)
      .sort('-_id')
      .exec()
      .then(stores => {
        res.json({ data: stores });
      })
      .fail(next);
  }

  function createStores(req: Request, res: Response, next: NextFunction) {
    const { name, address, phone, principal } = req.body;

    if (!(name && address && phone && principal)) {
      throw new HttpError(404);
    }

    return new Store({ name, address, phone, principal })
      .save()
      .then(store => {
        res.json({ data: store });
      })
      .fail(next);
  }

  function readStore(req: Request, res: Response, next: NextFunction) {
    const { sid } = req.params;

    Store.findById(sid)
      .exec()
      .then(store => {
        if (!store) {
          throw new HttpError(404);
        }

        res.json({ data: store });
      })
      .fail(next);
  }

  function updateStore(req: Request, res: Response, next: NextFunction) {
    const { sid } = req.params;
    const { name, address, phone, principal } = req.body;

    Store.findById(sid)
      .exec()
      .then(store => {
        if (!store) {
          throw new HttpError(404);
        }

        if (name !== void 0) {
          store.name = name;
        }
        if (address !== void 0) {
          store.address = address;
        }
        if (phone !== void 0) {
          store.phone = phone;
        }
        if (principal !== void 0) {
          store.principal = principal;
        }

        return store.save();
      })
      .then(data => res.json({ data }))
      .fail(next);
  }

  function removeStore(req: Request, res: Response, next: NextFunction) {
    const { sid } = req.params;

    Store.findById(sid)
      .exec()
      .then(store => {
        if (!store) {
          throw new HttpError(404);
        }

        return store.remove();
      })
      .then(data => res.json({ data }))
      .fail(next);
  }

  return router;
}
