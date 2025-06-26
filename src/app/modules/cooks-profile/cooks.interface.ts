import { Document, Types } from 'mongoose';

export interface ICooksProfile extends Document {
  user: Types.ObjectId | null;
  fullName: string;
  currentPostion: string;
  specialties: string[];
  yearsOfExperience: string;
  city: string;
  cv: string;
  profileImage: string;
  foodImages: string[];
  isVerified: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
