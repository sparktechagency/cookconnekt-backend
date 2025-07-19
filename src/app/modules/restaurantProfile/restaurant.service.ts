import CustomError from '../../errors';
import { IRestaurantsProfile } from './restaurant.interface';
import restaurantProfile from './restaurant.model';

const createRestaurantProfile = async (data: IRestaurantsProfile, user: any) => {
  const result = await restaurantProfile.create(data);
  if (!result) {
    throw new CustomError.BadRequestError('failed to create cook profile');
  }
  user.profile.id = result._id;
  user.isProfileCompleted = true;
  await user.save();
  return result;
};

export default {
  createRestaurantProfile,
};
