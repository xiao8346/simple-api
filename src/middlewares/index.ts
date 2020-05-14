import { IStorage } from '../utils/storage';
import { Models } from '../models';

export function middlewaresFactory(app: IStorage) {
  const { User } = app.get('models') as Models;
}
