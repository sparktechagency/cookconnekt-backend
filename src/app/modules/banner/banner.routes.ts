import express from "express"
import { uploadFile } from "../../../helpers/fileuploader";
import bannerController from "./banner.controller";

const bannerRouter = express.Router();

bannerRouter.get('/all',bannerController.getAllBanner);
bannerRouter.get('/active',bannerController.getActiveBanner);
bannerRouter.post('/create',uploadFile(),bannerController.createOrUpdateBanner)
bannerRouter.patch('/update/:id',uploadFile(),bannerController.createOrUpdateBanner)
bannerRouter.patch('/change-statatus/:id',uploadFile(),bannerController.createOrUpdateBanner)
bannerRouter.delete('/delete/:id',bannerController.deleteBanner)

export default bannerRouter;