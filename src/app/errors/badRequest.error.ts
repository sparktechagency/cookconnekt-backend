import { StatusCodes } from 'http-status-codes';

class BadRequestError extends Error {
  statusCode: number;
  status: string;

  constructor(message: string, stack?: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.status = 'failed';

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default BadRequestError;
