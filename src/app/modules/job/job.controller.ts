

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../../shared/sendResponse';
import jobServices from './job.services';


const createJob = async (req: Request, res: Response) => {

    const job = await jobServices.createJob(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      status: 'error',
      message: 'job created succesfully',
      data: job,
    });

};

const getAllJobs = async (_req: Request, res: Response) => {
  try {
    const jobs = await jobServices.getAllJobs();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      status: 'success',
      message: 'Jobs fetched successfully',
      data: jobs,
    });
  } catch (err) {
    sendResponse(res, {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: 'error',
      message: 'Failed to fetch jobs',
      data: err,
    });
  }
};

const getJobById = async (req: Request, res: Response) => {
  try {
    const job = await jobServices.getJobById(req.params.id);
    if (!job) {
      return sendResponse(res, {
        statusCode: StatusCodes.NOT_FOUND,
        status: 'fail',
        message: 'Job not found',
      });
    }
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      status: 'success',
      message: 'Job retrieved successfully',
      data: job,
    });
  } catch (err) {
    sendResponse(res, {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: 'error',
      message: 'Error fetching job',
      data: err,
    });
  }
};

const updateJob = async (req: Request, res: Response) => {
  try {
    const job = await jobServices.updateJob(req.params.id, req.body);
    if (!job) {
      return sendResponse(res, {
        statusCode: StatusCodes.NOT_FOUND,
        status: 'fail',
        message: 'Job not found',
      });
    }
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      status: 'success',
      message: 'Job updated successfully',
      data: job,
    });
  } catch (err) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      status: 'error',
      message: 'Failed to update job',
      data: err,
    });
  }
};

const deleteJob = async (req: Request, res: Response) => {
  try {
    const job = await jobServices.deleteJob(req.params.id);
    if (!job) {
      return sendResponse(res, {
        statusCode: StatusCodes.NOT_FOUND,
        status: 'fail',
        message: 'Job not found',
      });
    }
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      status: 'success',
      message: 'Job deleted successfully',
    });
  } catch (err) {
    sendResponse(res, {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: 'error',
      message: 'Failed to delete job',
      data: err,
    });
  }
};


export default {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob
}