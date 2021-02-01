import { Router, Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import { HttpError } from '../utils';
import { IStorage } from '../utils/storage';
import { IModel } from '../models';
// import { middlewaresFactory } from '../middlewares';

export function userRoutesFactory(app: IStorage): Router {
  const router = Router();
  const { User } = app.get('models') as IModel;

  // const { authVerify } = middlewaresFactory(app);

  router.post('/users/login', login);

  function login(req: Request, res: Response, next: NextFunction) {
    const { account, password } = req.body;

    User.findOne({ account })
      .exec()
      .then(user => {
        if (!user) {
          throw new HttpError(404);
        }

        if (!user.comparePassword(password)) {
          throw new HttpError(404);
        }

        const payload = {
          id: user.id,
          account: user.account
        };

        const options = {
          expiresIn: 2 * 60 * 60
        };

        const token = jwt.sign(payload, 'secret', options);

        req.user = user.id;

        return res.json({ data: token });
      })
      .fail(next);
  }

  return router;
}
