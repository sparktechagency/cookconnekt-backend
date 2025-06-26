import { ClientSession } from 'mongoose';
import { ICooksProfile } from './cooks.interface';
import cookProfile from './cooks.model';

const createCooksProfile = async (data: ICooksProfile, session?: ClientSession) => {
  return await new cookProfile(data).save({ session });
};

export default {
  createCooksProfile,
};
