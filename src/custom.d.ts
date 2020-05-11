declare namespace Express {
  export interface Request {
    user?: string;
  }
}

declare module 'mongoose' {
  import Q = require('q');
  type Promise<T> = Q.Promise<T>;
}
