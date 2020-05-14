import { Router, Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import { HttpError } from '../utils';
import { IStorage } from '../utils/storage';
import { Models } from '../models';
import { genPassword } from '../models/user';
// import { middlewaresFactory } from '../middlewares';

export function userRoutesFactory(app: IStorage): Router {
  const router = Router();
  const { User } = app.get('models') as Models;

  // const { } = middlewaresFactory(app);

  router.post('/user/login', login);
  // router.patch('/user/password', changePassword);

  function login(req: Request, res: Response, next: NextFunction) {
    const { name, password } = req.body;

    User.findOne({ name })
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
          name: user.name
        };

        const token = jwt.sign(payload, 'secret', { expiresIn: 2 * 60 * 60 });

        return res.json({ data: token });
      })
      .fail(next);
  }

  // function changePassword(req: Request, res: Response, next: NextFunction) {
  //   const { id, oldPassword, newPassword } = req.body;

  //   User.findById(id)
  //     .exec()
  //     .then(user => {
  //       if (!user) {
  //         throw new HttpError(404);
  //       }

  //       if (!user.comparePassword(oldPassword)) {
  //         throw new HttpError(400);
  //       }

  //       user.password = genPassword(newPassword);

  //       return user.save().then(savedUser => {});
  //     });
  // }

  return router;
}
