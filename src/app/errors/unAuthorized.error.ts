import { StatusCodes } from 'http-status-codes';
class UnAuthorizedError extends Error {
  statusCode: number;
  status?: string;
  constructor(message: string, stack?: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
    this.status = 'failed';
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default UnAuthorizedError;
