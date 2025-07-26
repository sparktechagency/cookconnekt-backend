import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import handleAsync from '../../../shared/handleAsync';
import sendResponse from '../../../shared/sendResponse';
import bannerServices from './banner.services';

const createOrUpdateBanner = handleAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const bannerData = JSON.parse(req.body.data);
  const files = req.files as unknown as Record<string, Express.Multer.File[]>;
  const bannerImage = files?.banner_image?.[0]?.path;

  const updatedData = {
    ...bannerData,
    ...(bannerImage && { image: bannerImage }),
  };

  let result;
  let message;

  if (id) {
    result = await bannerServices.updateBannerById(id, updatedData);
    message = 'Banner updated successfully';
  } else {
    result = await bannerServices.createBannerIntoDb(updatedData);
    message = 'Banner created successfully';
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message,
    data: result,
  });
});

const deleteBanner = handleAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await bannerServices.deleteBannerById(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'banner deleted succesfully',
    data: result,
  });
});

const getAllBanner = handleAsync(async (req: Request, res: Response) => {
  const result = await bannerServices.retrieveAllBanner();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'banner deleted succesfully',
    data: result,
  });
});


const getActiveBanner = handleAsync(async (req: Request, res: Response) => {
  const result = await bannerServices.retrieveActiveBanner();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'banner retrieve successfully succesfully',
    data: result,
  });
});


const updateBannerStatus = handleAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await bannerServices.setBannerStatus(id, status);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'banner deleted succesfully',
    data: result,
  });
});

export default {
  createOrUpdateBanner,
  deleteBanner,
  getAllBanner,
  updateBannerStatus,
  getActiveBanner,
};
