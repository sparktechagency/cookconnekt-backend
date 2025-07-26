
import { StatusCodes } from 'http-status-codes';
class ForbiddenError extends Error {
  statusCode : number;
  status: string;
  constructor(message:string, stack?: string){
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
    this.status = 'failed';
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ForbiddenError;

