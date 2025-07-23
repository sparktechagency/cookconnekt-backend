import express from "express";
import applyJobController from "./apply.job.controller";

const applyJobRouter = express.Router();
applyJobRouter.post('/job',applyJobController.createAppliedJob)

export default applyJobRouter