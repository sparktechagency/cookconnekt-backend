import CustomError from "../../errors";
import { IAppliedJob } from "./apply.job.interfaces";
import AppliedJob from "./apply.job.model";


const createAppliedJobIntoDb = async(data:IAppliedJob)=>{
  const isApplied = await AppliedJob.findOne({user: data.user, job:data.job});
  if(isApplied){
    throw new CustomError.BadRequestError('you have already applied this job')
  }
  const result = await AppliedJob.create(data);
  if(!result){
    throw new CustomError.BadRequestError('failed to create applied job')
  }
  return result;
}

export default {
    createAppliedJobIntoDb
};