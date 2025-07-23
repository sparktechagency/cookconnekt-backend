import mongoose, { Schema, model, Types } from 'mongoose';
import { IAppliedJob } from './apply.job.interfaces';

const appliedJobSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    job: {
      type: Types.ObjectId,
      ref: 'Job',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AppliedJob = mongoose.model<IAppliedJob>('AppliedJob', appliedJobSchema);
export default AppliedJob
