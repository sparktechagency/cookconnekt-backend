import mongoose from 'mongoose';
import { IAbout } from './about.interface';

const  aboutUsSchema = new mongoose.Schema<IAbout>(
  {
    description: String
  },
  {
    timestamps: true,
  },
);

const About = mongoose.model<IAbout>('about', aboutUsSchema);
export default About;
