import { STATUS_CODES } from 'http';;

export class HttpError extends Error {
  status: number;

  constructor(status: number) {
    super(STATUS_CODES[status]);
    this.name = this.constructor.name;
    this.status = status;
  }
}
