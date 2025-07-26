import express from 'express';
import applyJobRouter from '../modules/appliedJob/apply.job.routes';
import adminAuthRouter from '../modules/auth/adminAuth/admin.auth.routes';
import userAuthRouter from '../modules/auth/userAuth/user.auth.routes';
import bannerRouter from '../modules/banner/banner.routes';
import cooksRouter from '../modules/cooksProfile/cooks.routes';
import jobRouter from '../modules/job/job.routes';
import notificationRouter from '../modules/notification/notification.routes';
import restaurantRouter from '../modules/restaurantProfile/restaurant.routes';
import userRouter from '../modules/user/user.routes';
import aboutRouter from '../modules/aboutUs/about.routes';
import contactRouter from '../modules/contact/contact.routes';

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
  {
    path: '/notification',
    router: notificationRouter,
  },

  {
    path: '/banner',
    router: bannerRouter,
  },

  {
    path: '/about',
    router: aboutRouter,
  },
    {
    path: '/contact',
    router: contactRouter,
  }
];

appRouters.forEach((router) => {
  routersVersionOne.use(router.path, router.router);
});

export default routersVersionOne;
