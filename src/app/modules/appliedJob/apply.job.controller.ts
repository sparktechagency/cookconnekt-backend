import { Request, Response } from "express";
import handleAsync from "../../../shared/handleAsync";
import applyJobServices from "./apply.job.services";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";


const createAppliedJob = handleAsync(async(req:Request,res:Response)=>{
  const appliedJob = await applyJobServices.createAppliedJobIntoDb(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'apply the job succesfully',
    data: appliedJob,
  });
})

export default {
    createAppliedJob
}