import CustomError from '../../errors';
import { ICooksProfile } from './cooks.interface';
import cookProfile from './cooks.model';

const createCooksProfile = async (data: ICooksProfile, user: any) => {
  const result = await cookProfile.create(data);
  if (!result) {
    throw new CustomError.BadRequestError('failed to create cook profile');
  }
  user.profile.id = result._id;
  user.isProfileCompleted = true;
  await user.save();
  return result;
};

export default {
  createCooksProfile,
};
