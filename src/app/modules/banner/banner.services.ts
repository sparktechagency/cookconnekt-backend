import { ENUM_BANNER_STATUS } from '../../../enums/banner';
import CustomError from '../../errors';
import { IBanner } from './banner.interface';
import Banner from './banner.model';

const createBannerIntoDb = async (data: IBanner) => {
  const bannerDataExist = await Banner.find();
  if (bannerDataExist.length < 1) {
    const banner = await Banner.create(data);
    if (!banner) {
      throw new CustomError.BadRequestError('failed to create banner');
    }
    banner.status = ENUM_BANNER_STATUS.ACTIVE;
    await banner.save();
    return banner;
  }
  return await Banner.create(data);
};

const retrieveAllBanner = async () => {
  const result = await Banner.aggregate([
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        image: 1,
        status: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ]);

  return result;
};

const retrieveActiveBanner = async () => {
  const result = await Banner.aggregate([
    {
      $match: { status: ENUM_BANNER_STATUS.ACTIVE },
    },
    { $limit: 1 },
  ]);

  return result[0] || null;
};

const updateBannerById = async (id: string, data: Partial<IBanner>) => {
  return await Banner.findByIdAndUpdate(id, data, { new: true });
};

const deleteBannerById = async (id: string) => {
  return await Banner.findByIdAndDelete(id);
};

const setBannerStatus = async (id: string, status: string) => {
  if (status === ENUM_BANNER_STATUS.ACTIVE) {
    await Banner.updateOne({ status: ENUM_BANNER_STATUS.ACTIVE }, { $set: { status: ENUM_BANNER_STATUS.INACTIVE } });
  }
  return await Banner.findByIdAndUpdate(id, { status }, { new: true });
};

export default {
  createBannerIntoDb,
  updateBannerById,
  deleteBannerById,
  setBannerStatus,
  retrieveActiveBanner,
  retrieveAllBanner,
};
