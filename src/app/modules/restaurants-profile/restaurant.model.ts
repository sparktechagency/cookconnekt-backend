import mongoose, { Types } from 'mongoose';
import { IRestaurantsProfile } from './restaurant.interface';

const restaurantProfileSchema = new mongoose.Schema<IRestaurantsProfile>(
  {
    user: {
      type: Types.ObjectId,
      ref: 'user',
    },
    restaurantName: {
      type: String,
      required: [true, 'full name is required!'],
    },
    businessType: {
      type: String,
      required: [true, 'business type is required!'],
    },
    city: {
      type: String,
      required: [true, 'city is required'],
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

const restaurantProfile = mongoose.model<IRestaurantsProfile>('restaurantProfile', restaurantProfileSchema);

export default restaurantProfile;
