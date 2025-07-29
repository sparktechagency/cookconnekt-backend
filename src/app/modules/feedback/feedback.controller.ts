import { Request, Response } from "express";
import handleAsync from "../../../shared/handleAsync";


const submitUserFeedback = handleAsync(async(req:Request,res:Response)=>{
  const feedbackData = req.body; 
})

const getUserFeedBack  = handleAsync(async(req:Request,res:Response)=>{

})


export default {
    submitUserFeedback,
    getUserFeedBack
}