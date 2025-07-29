import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import handleAsync from '../../../shared/handleAsync';
import sendResponse from '../../../shared/sendResponse';
import jobServices from './job.services';

const createJob = handleAsync(async (req: Request, res: Response) => {
  const jobData = req.body;
  console.log(jobData);
  const job = await jobServices.createJob(jobData);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: 'job created succesfully',
    data: job,
  });
});

const getAllJobs = handleAsync(async (req: Request, res: Response) => {
  const job = await jobServices.getAllJobs(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'job data has been retrieved succesfully',
    data: job,
  });
});

const getFilterredJobs = handleAsync(async (req: Request, res: Response) => {
  console.log(req.query)
  const job = await jobServices.retrievefilteredJob(req.query);
  const message = job.data.length < 1 ? "no data found" : 'job data has been retrieved succesfully' 
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: message,
    data: job,
  });
});

const getJobById = handleAsync(async (req: Request, res: Response) => {
  const job = await jobServices.getJobById(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'job created succesfully',
    data: job,
  });
});

const updateJob = handleAsync(async (req: Request, res: Response) => {
  const job = await jobServices.updateJob(req.params.id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Job updated successfully',
    data: job,
  });
});

const deleteJob = handleAsync(async (req: Request, res: Response) => {
  const job = await jobServices.deleteJob(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Job deleted successfully',
    data: job
  });
});

export default {
  createJob,
  getAllJobs,
  getJobById,
  getFilterredJobs,
  updateJob,
  deleteJob,
};
