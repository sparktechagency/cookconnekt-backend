import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import handleAsync from '../../../shared/handleAsync';
import sendResponse from '../../../shared/sendResponse';
import CustomError from '../../errors';
import User from '../user/user.model';
import cooksServices from './cooks.services';

const completeCooksProfile = handleAsync(async (req: Request, res: Response) => {
  const data = JSON.parse(req.body.data);
  const { id } = req.params;
  const files = req.files as unknown as Record<string, Express.Multer.File[]>;
  console.log('files', files);
  const profileImage = files?.profile_image?.[0]?.path;
  const myCv = files?.cv?.[0]?.path;
  const foodImages = files.food_images?.map((file: Express.Multer.File) => file.path) || [];

  const user = await User.findById(id);
  if (!user) {
    throw new CustomError.NotFoundError('user not found');
  }
  const updatedData = {
    ...data,
    ...(profileImage && { profileImage }),
    ...(foodImages && { foodImages }),
    ...(myCv && { cv: myCv }),
  };
  const result = await cooksServices.createCooksProfile(updatedData,user);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'User profile completed succesfully',
    data: result,
  });
});

const getCookProfiles = handleAsync(async(req:Request,res:Response)=>{
  const cookProfiles = await cooksServices.getCookProfiles(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'User profile completed succesfully',
    data: cookProfiles,
  });
})

const getSpecificCookDetails = handleAsync(async(req:Request,res:Response)=>{
  const cookProfiles = await cooksServices.getCookProfileDetails(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'User specific details retrieved succesfully',
    data: cookProfiles,
  });
})

const getFilteredCookProfiles = handleAsync(async(req:Request,res:Response)=>{
  const cookProfiles = await cooksServices.retrieveFilteredCookProfiles(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'User profile completed succesfully',
    data: cookProfiles,
  });
})

export default {
  completeCooksProfile,
  getFilteredCookProfiles,
  getCookProfiles,
  getSpecificCookDetails
};
