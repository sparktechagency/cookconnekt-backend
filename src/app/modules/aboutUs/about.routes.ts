import express from 'express';
import aboutControllers from './about.controllers';

const aboutRouter = express.Router();

aboutRouter.post('/create-or-update', aboutControllers.createOrUpdateAbout);

aboutRouter.get('/retrieve', aboutControllers.getAbout);

export default aboutRouter;
