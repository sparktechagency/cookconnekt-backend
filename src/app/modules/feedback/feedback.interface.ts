import { Document } from "mongoose";
import { ENUM_USER_ROLE } from "../../../enums/user-role";


export interface IFeedback extends Document {
  name: string;
  email:string;
  userType: ENUM_USER_ROLE.COOKS | ENUM_USER_ROLE.RESTAURANT;
  goalAchieved: boolean;
  experienceRating: number;
  additionalComments?: string;
  submittedAt?: Date;
}
