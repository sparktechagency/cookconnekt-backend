import mongoose from 'mongoose';
import { IFeedback } from './feedback.interface';

const feedbackSchema = new mongoose.Schema<IFeedback>(
  {
    userType: {
      type: String,
      enum: ['cook', 'employer'],
      required: true,
    },
    goalAchieved: {
      type: Boolean,
      required: true,
    },
    experienceRating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    additionalComments: {
      type: String,
      trim: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model<IFeedback>('Feedback', feedbackSchema);

export default Feedback;
