import { Document, Types } from 'mongoose';

export interface IRestaurantsProfile extends Document {
  user: Types.ObjectId | null;
  restaurantName: string;
  businessType: string;
  city: string;
  location: {
    lat: number;
    lon: number;
  };
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
