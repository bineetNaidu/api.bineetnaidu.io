/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import CustomError from './CustomError';

export default class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('Page Not Found!');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  // eslint-disable-next-line class-methods-use-this
  serializeErrors() {
    return [{ message: 'Page Not Found!' }];
  }
}
