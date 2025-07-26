import mongoose from 'mongoose';
import { IBanner } from './banner.interface';
import { ENUM_BANNER_STATUS } from '../../../enums/banner';

export const bannerSchema = new mongoose.Schema<IBanner>(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
    },
    description: {
      type: String,
      required: [true, 'description is required'],
    },
    image: {
      type: String,
      required: [true, 'image is required'],
    },
    status: {
      type: String,
      enum: {
        values: [ENUM_BANNER_STATUS.ACTIVE, ENUM_BANNER_STATUS.INACTIVE],
        message: '{VALUE} is not accepted as a status value. Use active/inactive.',
      },
      default: ENUM_BANNER_STATUS.INACTIVE,
    },
  },
  {
    timestamps: true,
  },
);

const Banner = mongoose.model<IBanner>('banner', bannerSchema);
export default Banner;
