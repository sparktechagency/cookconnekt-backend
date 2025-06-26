import { ClientSession, Types } from 'mongoose';
import config from '../../../../config';
import { ENUM_USER_ROLE } from '../../../../enums/user-role';
import withTransaction from '../../../../helpers/withTransaction';
import IdGenerator from '../../../../utilities/idGenerator';
import sendMail from '../../../../utilities/sendEmail';
import CustomError from '../../../errors';
import cooksServices from '../../cooks-profile/cooks.services';
import Profile from '../../profile-module/profile.model';
import IUser from '../user.interface';
import User from '../user.model';
import { IProfile } from './../../profile-module/profile.interface';
import { ICooksProfile } from '../../cooks-profile/cooks.interface';
import { IRestaurantsProfile } from '../../restaurants-profile/restaurant.interface';
import restaurantService from '../../restaurants-profile/restaurant.service';

export const createUser = async (data: IUser & ICooksProfile & IRestaurantsProfile, files: any) => {
  const result = await withTransaction(async (session: ClientSession) => {
    try {
      const verificationCode = IdGenerator.generateNumberId();
      const expireDate = new Date();
      expireDate.setMinutes(expireDate.getMinutes() + 30);

      const userData = {
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role,
        verification: {
          code: verificationCode,
          expireDate,
        },
      };

      const newUser: any = await User.create([userData], { session });
      console.log(newUser)
      if (!newUser) {
        throw new CustomError.BadRequestError('Failed to create user');
      }

      const mailOptions = {
        from: config.gmail_app_user,
        to: userData.email,
        subject: 'Email Verification',
        text: `Your email verification code is ${verificationCode}`,
      };
      sendMail(mailOptions);

      const cvFile = files.cv?.[0];
      const foodImages = files.food_images?.map((file:Express.Multer.File) => file.path) || [];

      console.log(cvFile?.path); // 'uploads/cv/1719253333222-resume.pdf'

      let profilePayload: any = {
        user: newUser[0]._id,
      };
      const role = data.role;

      switch (role) {
        case ENUM_USER_ROLE.COOKS:
          Object.assign(profilePayload, {
            fullName: data.fullName,
            yearsOfExperience: data.yearsOfExperience,
            specialties: data.specialties,
            city: data.city,
            cv: cvFile?.path,
            foodImages: foodImages,
            currentPostion: data.currentPostion,
          });
          const cooksProfile = await cooksServices.createCooksProfile(profilePayload, session);
          if (cooksProfile) {
            newUser[0].profile = cooksProfile._id as unknown as Types.ObjectId;
          }
          await newUser[0].save({ session });
          break;

        case ENUM_USER_ROLE.RESTAURANT:
          Object.assign(profilePayload, {
    
            restaurantName: data.restaurantName,
            businessType: data.businessType,
            city: data.city
          });
          const restaurantProfile = await restaurantService.createRestaurantProfile(profilePayload, session);
          if (restaurantProfile) {
            newUser[0].profile = restaurantProfile._id as unknown as Types.ObjectId;
          }
          await newUser[0].save({ session });
          break;

        default:
          throw new CustomError.BadRequestError('Invalid role provided.');
      }

      return {
        email: userData.email,
        phone: userData.phone,
        ...profilePayload
      };
    } catch (err) {
      throw err;
    }
  });

  return result;
};
