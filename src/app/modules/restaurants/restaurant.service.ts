import { ClientSession } from 'mongoose';
import { IRestaurantsProfile } from './restaurant.interface';
import restaurantProfile from './restaurant.model';


const createRestaurantProfile = async (data: IRestaurantsProfile, session?: ClientSession) => {
  return await new restaurantProfile(data).save({ session });
};

export default {
  createRestaurantProfile
};
