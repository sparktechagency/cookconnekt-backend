import mongoose from 'mongoose';
import { IJobs } from './job.interface';

const JobSchema = new mongoose.Schema<IJobs>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RestaurantProfile',
      required: true
    },
    title: { type: String, required: [true, 'Job title is required'] },
    description: { type: String, required: [true, 'Job description is required'] },
    contactType: { type: String, required: [true, 'Contact type is required'] },
    desiredExperience: { type: Number, required: [true, 'Desired experience is required'] },
    desiredSpecialities: [{ type: String, required: [true, 'At least one speciality is required'] }],
    city: { type: String, required: [true, 'city is required'] },
    address: {
      name: { type: String, required: [true, 'Address name is required'] },
      location: {
        lat: { type: Number, required: [true, 'Latitude is required'] },
        lon: { type: Number, required: [true, 'Longitude is required'] },
      },
    },
    position: { type: String, required: [true, 'position is required'] },
    desiredAvailibilty: { type: String, required: [true, 'Desired availability is required'] },
    proposedSalary: { type: String, required: [true, 'Proposed salary is required'] },
    typeOfEstablishment: { type: String, required: [true, 'Type of establishment is required'] },
    vacancy: { type: Number, required: [true, 'Vacancy count is required'] },
    accommodation: { type: Boolean, required: [true, 'Accommodation info is required'] },
    requirements: { type: String, required: [true, 'Requirements are required'] },
    isNewPublish: { type: Boolean, default: true },
    isApproved: { type: Boolean, default: false },
    benefits: { type: String, required: [true, 'Benefits info is required'] },
    offerVisibility: {
      type: String,
      enum: ['public', 'anonymous'],
      default: 'public',
    },
    deadline: { type: Date, required: [true, 'Application deadline is required'] },
  },
  { timestamps: true },
);

const Job = mongoose.model<IJobs>('Job', JobSchema);
export default Job;