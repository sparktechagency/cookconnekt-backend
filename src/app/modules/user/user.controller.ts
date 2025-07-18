import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import handleAsync from '../../../shared/handleAsync';
import sendResponse from '../../../shared/sendResponse';
import CustomError from '../../errors';
import User from './user.model';
import userServices from './user.services';

// register user
const registerController = handleAsync(async (req: Request, res: Response) => {

  // const files = req.files as unknown as Record<string, Express.Multer.File[]>;
  // console.log("files",files)
  const userData = req.body;
  console.log(userData)
  const user = await User.findOne({email:userData.email});

  if (user) {
    throw new CustomError.BadRequestError('email or phone already exist');
  }

  const result = await userServices.createUser(userData);

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
