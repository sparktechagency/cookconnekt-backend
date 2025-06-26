import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import handleAsync from '../../../shared/handleAsync';
import sendResponse from '../../../shared/sendResponse';
import CustomError from '../../errors';
import { userServices } from './services/index';
import User from './user.model';

// register user
const registerController = handleAsync(async (req: Request, res: Response) => {

  const files = req.files as unknown as Record<string, Express.Multer.File[]>;
  console.log("files",files)
  const userData = JSON.parse(req.body.data);
  console.log(userData)
  const user = await User.findOne({ $or: [{ email: userData.email, phone: userData.phone }] });

  if (user) {
    throw new CustomError.BadRequestError('email or phone already exist');
  }

  const result = await userServices.createUser(userData,files);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: 'User registration successful.Check email for verify your email',
    data: result,
  });
});

// get specific user

export default {
  registerController,
};
