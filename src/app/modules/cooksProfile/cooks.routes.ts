import express from 'express';
import { uploadFile } from '../../../helpers/fileuploader';
import cooksController from './cooks.controller';

const cooksRouter = express.Router()

cooksRouter.post('/complete-profile/:id',uploadFile(),cooksController.completeCooksProfile)
export default cooksRouter;