import express from 'express';
import adminControllers from './admin.controllers';
import authentication from '../../middlewares/auth.middleware';
import { ENUM_USER_ROLE } from '../../../enums/user-role';

const adminRouter = express.Router();

adminRouter.post('/create', adminControllers.createAdmin);
adminRouter.get('/retrieve/all', authentication(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),adminControllers.getAllAdmin);
adminRouter.get('/retrieve/:id',authentication(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN), adminControllers.getSpecificAdmin);
adminRouter.patch('/update/:id', authentication(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN), adminControllers.updateSpecificAdmin);
adminRouter.delete('/delete/:id', authentication(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN), adminControllers.deleteSpecificAdmin);

export default adminRouter;
