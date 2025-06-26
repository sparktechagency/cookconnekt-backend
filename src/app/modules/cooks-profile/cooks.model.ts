import mongoose, { Types } from 'mongoose';
import { ICooksProfile } from './cooks.interface';

const cooksProfileSchema = new mongoose.Schema<ICooksProfile>(
  {
    user: {
      type: Types.ObjectId,
      ref: 'user',
    },
    fullName: {
      type: String,
      required: [true, 'full name is required!'],
    },
    city: {
        type: String,
        required: [true, 'city is required']
    },
    specialties: {
        type: [String],
        required: [true, 'specialists is required']
    },
    yearsOfExperience: {
        type: String,
        required: [true, 'year of experience is required']
    },
    cv: {
        type: String,
        required: [true, 'cv is required']
    },
    profileImage: {
        type: String,
        required: [false, 'profile image is optional'],
        default: ""
    },
    foodImages:{
        type: [String],
        required: [true, 'food image is required']
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const cookProfile = mongoose.model<ICooksProfile>('cookProfile', cooksProfileSchema);

export default cookProfile;
