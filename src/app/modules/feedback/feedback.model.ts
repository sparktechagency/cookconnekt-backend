import mongoose from 'mongoose';
import { ENUM_USER_ROLE } from '../../../enums/user-role';
import { IFeedback } from './feedback.interface';
import validator from 'validator';

const feedbackSchema = new mongoose.Schema<IFeedback>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required!'],
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: (props: { value: string }) => `${props.value} is not a valid email!`,
      },
    },
    userType: {
      type: String,
      enum: Object.values(ENUM_USER_ROLE),
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
      required: false,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const Feedback = mongoose.model<IFeedback>('Feedback', feedbackSchema);

export default Feedback;
