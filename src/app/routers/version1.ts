import express from 'express';
import userRouter from '../modules/user/user.routes';
import userAuthRouter from '../modules/auth/userAuth/user.auth.routes';
import adminAuthRouter from '../modules/auth/adminAuth/admin.auth.routes';
import cooksRouter from '../modules/cooksProfile/cooks.routes';

const routersVersionOne = express.Router();

const appRouters = [
  {
    path: '/user',
    router: userRouter,
  },
   {
    path: '/user/auth',
    router: userAuthRouter,
  },
    {
    path: '/admin/auth',
    router: adminAuthRouter,
  },
  {
    path: '/cooks',
    router: cooksRouter,
  },
];

appRouters.forEach((router) => {
  routersVersionOne.use(router.path, router.router);
});

export default routersVersionOne;
