import { IJobs } from "./job.interface";
import { Job } from "./job.model";


const createJob = async (data: Partial<IJobs>) => {
  const job = await Job.create(data);
  return job;
};

const getAllJobs = async (): Promise<IJobs[]> => {
  return await Job.find();
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