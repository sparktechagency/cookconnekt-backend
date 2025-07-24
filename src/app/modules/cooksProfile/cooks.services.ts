import mongoose from 'mongoose';
import CustomError from '../../errors';
import User from '../user/user.model';
import { ICooksProfile } from './cooks.interface';
import cookProfile from './cooks.model';

const createCooksProfile = async (data: ICooksProfile, user: any) => {
  const result = await cookProfile.create(data);
  if (!result) {
    throw new CustomError.BadRequestError('failed to create cook profile');
  }
  user.profile.id = result._id;
  user.isProfileCompleted = true;
  await user.save();
  return result;
};


const getCookProfiles = async (
  query: Record<string, any>,
): Promise<{
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: any[];
}> => {
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;
  const skip = (page - 1) * limit;
  const searchTerm = (query.searchTerm as string)?.trim() || '';

  const matchStage: any = {};

  if (searchTerm) {
    matchStage.$or = [
      { fullName: { $regex: searchTerm, $options: 'i' } },
      { rating: { $regex: searchTerm, $options: 'i' } },
      { city: { $regex: searchTerm, $options: 'i' } },
      { yearsOfExperience: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  const result = await cookProfile.aggregate([
    { $match: matchStage },
    {
      $project: {
        _id: 1,
        fullName: 1,
        city: 1,
        yearsOfExperience: 1,
        rating: 1,
      },
    },
    {
      $facet: {
        data: [{ $sort: { createdAt: -1 } }, { $skip: skip }, { $limit: limit }],
        totalCount: [{ $count: 'count' }],
      },
    },
  ]);

  const data = result[0]?.data || [];
  const total = result[0]?.totalCount[0]?.count || 0;

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data,
  };
};


const retrieveFilteredCookProfiles = async (
  query: Record<string, any>,
): Promise<{
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: any[];
}> => {
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const matchStage: any = {};

  const andConditions: any[] = [];

  if (query.city) {
    andConditions.push({ city: { $regex: query.city, $options: 'i' } });
  }

  if (query.currentPosition) {
    andConditions.push({ currentPosition: { $regex: query.currentPosition, $options: 'i' } });
  }

  if (query.specialties) {
    andConditions.push({ specialties: { $regex: query.specialties, $options: 'i' } });
  }

  if (query.yearsOfExperience) {
    andConditions.push({ yearsOfExperience: { $regex: query.yearsOfExperience, $options: 'i' } });
  }

  if (andConditions.length > 0) {
    matchStage.$and = andConditions;
  }

  const result = await cookProfile.aggregate([
    { $match: matchStage },
    {
      $project: {
        _id: 1,
        fullName: 1,
        city: 1,
        currentPosition: 1,
        specialties: 1,
        yearsOfExperience: 1,
      },
    },
    {
      $facet: {
        data: [{ $sort: { createdAt: -1 } }, { $skip: skip }, { $limit: limit }],
        totalCount: [{ $count: 'count' }],
      },
    },
  ]);

  const data = result[0]?.data || [];
  const total = result[0]?.totalCount[0]?.count || 0;

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data,
  };
};


const getCookProfileDetails = async (id: string) => {
  const result = await User.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(id) },
    },
    {
      $lookup: {
        from: 'cookprofiles',
        localField: 'profile.id',
        foreignField: '_id',
        as: 'profileData',
      },
    },
    {
      $unwind: '$profileData',
    },
    {
      $project: {
        name: 1,
        email: 1,
        profile: '$profileData',
      },
    },
  ]);

  if (!result.length) {
    throw new CustomError.BadRequestError('Failed to get cook details');
  }

  return result[0];
};


export default {
  createCooksProfile,
  retrieveFilteredCookProfiles,
  getCookProfiles,
  getCookProfileDetails,
};
