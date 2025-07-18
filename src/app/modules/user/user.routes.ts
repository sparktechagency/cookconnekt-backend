import express from 'express';

import requestValidator from '../../middlewares/request.validator';
import userController from './user.controller';
import userValidationZodSchema from './user.zod.validations';

const userRouter = express.Router();

userRouter.post('/create', requestValidator(userValidationZodSchema.registerUserValidationSchema), userController.registerController);
export default userRouter;
