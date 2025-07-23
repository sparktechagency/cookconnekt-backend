import { Types } from "mongoose";


export interface IAppliedJob extends Document {
  user: Types.ObjectId,
  job: Types.ObjectId
  createdAt: Date;
  updatedAt: Date;
}