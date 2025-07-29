import { Document, Types } from 'mongoose';

interface Iadress {
  name: string;
  location: {
    lat: number;
    lon: number;
  };
}
export interface IJobs extends Document {
  user: Types.ObjectId,
  restaurant: Types.ObjectId,
  title: string;
  description: string;
  contactType: string;
  desiredExperience: number;
  desiredSpecialities: string[];
  city: string;
  address: Iadress;
  position: string;
  desiredAvailibilty: string;
  proposedSalary: string;
  typeOfEstablishment: string;
  vacancy: number;
  accommodation: boolean;
  requirements: string;
  isNewPublish: boolean;
  isApproved: boolean;
  benefits: string;
  offerVisibility: 'public' | 'anonymous';
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
}
