import { IJobs } from "./job.interface";
import Job from "./job.model";



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
      { title: { $regex: searchTerm, $options: 'i' } },
      { category: { $regex: searchTerm, $options: 'i' } },
      { status: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  const result = await Job.aggregate([
    { $match: matchStage },
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
    getJobById,
    updateJob,
    deleteJob
}