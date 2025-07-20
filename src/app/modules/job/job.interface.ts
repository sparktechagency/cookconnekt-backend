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
  title: string;
  description: string;
  contactType: string;
  desiredExperience: number;
  desiredSpecialities: string[];
  address: Iadress;
  desiredAvailibilty: string;
  proposedSalary: string;
  typeOfEstablishment: string;
  vacancy: number;
  accommodation: boolean;
  requirements: string;
  isNewPublish: boolean;
  benefits: string;
  offerVisibility: 'public' | 'anonymous';
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
}
