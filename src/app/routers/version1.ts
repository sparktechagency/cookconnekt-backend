import express from 'express';
import userRouter from '../modules/user/user.routes';
import userAuthRouter from '../modules/auth/userAuth/user.auth.routes';
import adminAuthRouter from '../modules/auth/adminAuth/admin.auth.routes';
import cooksRouter from '../modules/cooksProfile/cooks.routes';
import restaurantRouter from '../modules/restaurantProfile/restaurant.routes';
import jobRouter from '../modules/job/job.routes';
import applyJobRouter from '../modules/appliedJob/apply.job.routes';

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
  {
    path: '/restaurant',
    router: restaurantRouter,
  },
  {
    path: '/job',
    router: jobRouter,
  },
    {
    path: '/apply',
    router: applyJobRouter,
  },
];

appRouters.forEach((router) => {
  routersVersionOne.use(router.path, router.router);
});

export default routersVersionOne;
