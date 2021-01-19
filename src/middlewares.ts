import * as jwt from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';
import { IStorage } from './utils/storage';
import { IModel } from './models';
import { HttpError } from './utils';


export function middlewaresFactory(app: IStorage) {
  function authVerify(req: Request, res: Response, next: NextFunction) {
    const { token } = req.query;
    const { User } = app.get('models') as IModel;
    if (token !== void 0 || req.headers.authorization !== void 0) {
      const payload = jwt.decode(token || req.headers.authorization.split(' ')[1]) as any;

      if (!payload.id) {
        throw new HttpError(403);
      }

      return User.findById(payload.id).exec()
        .then(user => {
          if (!user) { throw new HttpError(401); }

          next();
        })
        .fail(next);
    }

    throw new HttpError(401);
  }

  return { authVerify };
}
