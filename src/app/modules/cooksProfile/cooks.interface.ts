import { Document, Types } from 'mongoose';

export interface IExperience {
  companyName: string;
  position: string;
  workPeriod: {
    from: Date;
    to?: Date; 
  };
}

export interface ICooksProfile extends Document {
  user: Types.ObjectId | null;
  fullName: string;
  currentPostion: string;
  specialties: string[];
  experienceLevel: string;
  yearsOfExperience: string;
  experienceList: IExperience[];
  city: string;
  adress: string;
  phone: string;
  cv: string;
  profileImage: string;
  foodImages: string[];
  isVerified: boolean;
  rating:number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
