import { Request, Response } from 'express';
import About from './about.model';
import CustomError from '../../errors';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../../shared/sendResponse';
import handleAsync from '../../../shared/handleAsync';


// Controller to create or update Terms and Conditions content
const createOrUpdateAbout = handleAsync(async (req: Request, res: Response) => {
  const { description } = req.body;

  const existingAbout = await About.findOne();

  if (existingAbout) {
    
    const updatedAbout = await About.findByIdAndUpdate(
      { _id: existingAbout._id },
      { description },
      { runValidators: true },
    );

    if (!updatedAbout) {
      throw new CustomError.BadRequestError('Failed to update Terms and Conditions');
    }

    return sendResponse(res, {
      statusCode: StatusCodes.OK,
      status: 'success',
      message: 'Terms and Conditions updated successfully',
      data: updatedAbout
    });
  } else {
    // Create a new Terms and Conditions record
    const newAbout = await About.create({ description });

    if (!newAbout) {
      throw new CustomError.BadRequestError('Failed to create Terms and Conditions');
    }

    return sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      status: 'success',
      message: 'Terms and Conditions created successfully',
      data: newAbout
    });
  }
});

// Controller to get Terms and Conditions content
const getAbout = handleAsync(async (req: Request, res: Response) => {
  const data = await About.findOne();

  if (!data) {
    throw new CustomError.NotFoundError('No Terms and Conditions found!');
  }

  return sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Terms and Conditions content retrieved successfully',
    data: data,
  });
});

export default {
  createOrUpdateAbout,
  getAbout,
};
