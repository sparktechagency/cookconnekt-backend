import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import handleAsync from '../../../shared/handleAsync';
import sendResponse from '../../../shared/sendResponse';
import CustomError from '../../errors';
import User from '../user/user.model';
import restaurantService from './restaurant.service';

const completeRestaurantProfile = handleAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    throw new CustomError.BadRequestError('user not found');
  }

  const result = await restaurantService.createRestaurantProfile(data,user);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'User profile completed succesfully',
    data: result,
  });
});

export default {
  completeRestaurantProfile,
};
