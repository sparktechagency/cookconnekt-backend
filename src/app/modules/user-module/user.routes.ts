
import express from 'express';
import { uploadFile } from '../../../helpers/fileuploader';
import userController from './user.controller';

const userRouter = express.Router()

userRouter.post('/create',uploadFile(),userController.registerController)
export default userRouter
