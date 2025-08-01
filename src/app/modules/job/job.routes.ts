import express from 'express';
import jobController from './job.controller';

const jobRouter = express.Router();

jobRouter.post('/create', jobController.createJob);
jobRouter.get('/retrieve-filter-job', jobController.getFilterredJobs);
jobRouter.get('/all', jobController.getAllJobs);
jobRouter.get('/:id', jobController.getJobById);
jobRouter.put('/update/:id', jobController.updateJob);
jobRouter.delete('/delete/:id', jobController.deleteJob);

export default jobRouter;
