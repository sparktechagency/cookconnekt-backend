import mongoose, { Types } from 'mongoose';
import { IProfile } from './profile.interface';

const profileSchema = new mongoose.Schema<IProfile>(
  {
    user: {
      type: Types.ObjectId,
      ref: 'user',
    },
    name: {
      type: String,
      required: [true, 'name is required!'],
    },
    location: {
      lat: {
        type: Number,
        required: true,
      },
      lon: {
        type: Number,
        required: true,
      },
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

const Profile = mongoose.model<IProfile>('profile', profileSchema);

export default Profile;
