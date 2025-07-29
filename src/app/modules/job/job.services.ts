import { IJobs } from './job.interface';
import Job from './job.model';

const createJob = async (data: Partial<IJobs>) => {
  const job = await Job.create(data);
  return job;
};

const getAllJobs = async (
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
      { city: { $regex: searchTerm, $options: 'i' } },
      { position: { $regex: searchTerm, $options: 'i' } },
      { 'restaurant.name': { $regex: searchTerm, $options: 'i' } }, 
    ];
  }

  const result = await Job.aggregate([
    
    {
      $lookup: {
        from: 'restaurantprofiles',
        localField: 'user',
        foreignField: 'user',
        as: 'restaurant',
      },
    },
    { $unwind: '$restaurant' },
    { $match: matchStage },
    {
      $project: {
        _id: 1,
        restaurantName: '$restaurant.restaurantName',
        name: 1,
        city: 1,
        position: 1,
        vacancy: 1,
        createdAt: 1,
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

// retrieve filterred job
const retrievefilteredJob = async (
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

  function isNonEmptyString(value: any) {
    return typeof value === 'string' && value.trim() !== '';
  }

  if (isNonEmptyString(query.searchTerm)) {
    andConditions.push({
      $or: [
        { title: { $regex: query.searchTerm.trim(), $options: 'i' } },
        { position: { $regex: query.searchTerm.trim(), $options: 'i' } },
        { city: { $regex: query.searchTerm.trim(), $options: 'i' } },
        { specialties: { $regex: query.searchTerm.trim(), $options: 'i' } },
      ],
    });
  }

  if (isNonEmptyString(query.city)) {
    andConditions.push({ city: { $regex: query.city.trim(), $options: 'i' } });
  }

  if (isNonEmptyString(query.position)) {
    andConditions.push({ position: { $regex: query.position.trim(), $options: 'i' } });
  }

  if (isNonEmptyString(query.contactType)) {
    andConditions.push({ specialties: { $regex: query.contactType.trim(), $options: 'i' } });
  }

  if (isNonEmptyString(query.accommodation)) {
    andConditions.push({ accommodation: { $regex: query.accommodation.trim(), $options: 'i' } });
  }

  if (andConditions.length > 0) {
    matchStage.$and = andConditions;
  }

  const result = await Job.aggregate([
    { $match: matchStage },
    {
      $project: {
        _id: 1,
        title: 1,
        city: 1,
        position: 1,
        requirements: 1,
        yearsOfExperience: 1,
        createdAt: 1,
        deadline: 1,
        isNewPublish: 1,
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

const getJobById = async (id: string): Promise<IJobs | null> => {
  return await Job.findById(id);
};

const updateJob = async (id: string, data: Partial<IJobs>) => {
  return await Job.findByIdAndUpdate(id, data, { new: true });
};

const deleteJob = async (id: string): Promise<IJobs | null> => {
  return await Job.findByIdAndDelete(id);
};

export default {
  createJob,
  getAllJobs,
  retrievefilteredJob,
  getJobById,
  updateJob,
  deleteJob,
};
