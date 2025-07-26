
import { Request, Response } from "express";
import handleAsync from "../../../shared/handleAsync";
import sendMail from "../../../utilities/sendEmail";
import config from "../../../config";
import contactEmailTemplate from "../../../mailTemplate/contactTemplate";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";


const sendMessageToAdmin = handleAsync(async(req:Request,res:Response)=>{
   const data = req.body;
   const mailOptions = {
       from: data.email,
       to: config.gmail_app_user,
       subject: data.subject,
       html: contactEmailTemplate(data.opinion),
     };
    sendMail(mailOptions);
    sendResponse(res, {
       statusCode: StatusCodes.OK,
       status: 'success',
       message: 'contact message sent successfully',
       data: data,
     });
})

export default {
    sendMessageToAdmin
}

