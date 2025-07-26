

import express from "express";
import requestValidator from "../../middlewares/request.validator";
import contactZodValidation from "./contact.zod.validation";
import contactController from "./contact.controller";

const contactRouter = express.Router();
contactRouter.post('/send',requestValidator(contactZodValidation.contactRequestSchema),contactController.sendMessageToAdmin)

export default contactRouter;