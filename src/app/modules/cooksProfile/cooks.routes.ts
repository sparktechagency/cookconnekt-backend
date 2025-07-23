import express from 'express';
import { uploadFile } from '../../../helpers/fileuploader';
import cooksController from './cooks.controller';

const cooksRouter = express.Router()

cooksRouter.post('/complete-profile/:id',uploadFile(),cooksController.completeCooksProfile)
cooksRouter.get('/retrieve-profile',cooksController.getFilteredCookProfiles)
cooksRouter.get('/all-profile',cooksController.getCookProfiles)
cooksRouter.get('/:id',cooksController.getSpecificCookDetails)
export default cooksRouter;