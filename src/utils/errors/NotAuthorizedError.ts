import CustomError from './CustomError';

export default class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Forbidden');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  // eslint-disable-next-line class-methods-use-this
  serializeErrors() {
    return [{ message: 'Not Authorized' }];
  }
}
