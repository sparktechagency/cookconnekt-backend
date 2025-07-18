import { Document, Types } from 'mongoose';

export interface IProfile extends Document {
  user: Types.ObjectId | null;
  name: string;
  currentPostion: {
    type: String;
    required: [true, 'current position is required'];
  };
  specialties: {
    type: [String];
    required: [false, 'food image is not required'];
  };
  yearsOfExperience: {
    type: String;
    required: [true, 'year of experience is required!'];
  };
  city: {
    type: String;
    required: [true, 'city is required'];
  };
  cv: {
    type: String;
    required: [true, 'cv is required'];
  };
  profileImage: {
    type: String;
    required: [false, 'profileImage is not required'];
  };
  foodImages: {
    type: [String];
    required: [false, 'food image is not required'];
  };
  location: {
    lat: number;
    lon: number;
  };
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
