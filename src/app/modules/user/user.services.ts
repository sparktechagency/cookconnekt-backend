
import { ClientSession } from 'mongoose';
import config from '../../../config';
import withTransaction from '../../../helpers/withTransaction';
import registrationEmailTemplate from '../../../mailTemplate/registrationTemplate';
import IdGenerator from '../../../utilities/idGenerator';
import sendMail from '../../../utilities/sendEmail';
import CustomError from '../../errors';
import IUser from './user.interface';
import User from './user.model';
import { ENUM_USER_ROLE } from '../../../enums/user-role';


const createUser = async (data: IUser) => {
  const result = await withTransaction(async (session: ClientSession) => {
    try {
      const verificationCode = IdGenerator.generateNumberId();
      const expireDate = new Date();
      const expireTime = 10;
      expireDate.setMinutes(expireDate.getMinutes() + expireTime);

      const userData = {
        email: data.email,
        password: data.password,
        profile:{
          role: data.role as ENUM_USER_ROLE.COOKS | ENUM_USER_ROLE.RESTAURANT
        },
        verification: {
          code: verificationCode,
          expireDate,
        },
      };

      const [newUser]: any = await User.create([userData], { session });
      console.log(newUser);
      if (!newUser) {
        throw new CustomError.BadRequestError('Failed to create user');
      }

      const mailOptions = {
        from: config.gmail_app_user,
        to: newUser.email,
        subject: 'Email Verification',
        html: registrationEmailTemplate(verificationCode, expireTime, 'cookConneckts'),
      };
      sendMail(mailOptions);

      // const cvFile = files.cv?.[0];
      // const foodImages = files.food_images?.map((file:Express.Multer.File) => file.path) || [];
      // console.log(cvFile?.path);

      // let profilePayload: any = {
      //   user: newUser[0]._id,
      // };
      // const role = data.role;

      // switch (role) {
      //   case ENUM_USER_ROLE.COOKS:
      //     Object.assign(profilePayload, {
      //       fullName: data.fullName,
      //       yearsOfExperience: data.yearsOfExperience,
      //       specialties: data.specialties,
      //       city: data.city,
      //       cv: cvFile?.path,
      //       foodImages: foodImages,
      //       currentPostion: data.currentPostion,
      //     });
      //     const cooksProfile = await cooksServices.createCooksProfile(profilePayload, session);
      //     if (cooksProfile) {
      //       newUser[0].profile = cooksProfile._id as unknown as Types.ObjectId;
      //     }
      //     await newUser[0].save({ session });
      //     break;

      //   case ENUM_USER_ROLE.RESTAURANT:
      //     Object.assign(profilePayload, {

      //       restaurantName: data.restaurantName,
      //       businessType: data.businessType,
      //       city: data.city
      //     });
      //     const restaurantProfile = await restaurantService.createRestaurantProfile(profilePayload, session);
      //     if (restaurantProfile) {
      //       newUser[0].profile = restaurantProfile._id as unknown as Types.ObjectId;
      //     }
      //     await newUser[0].save({ session });
      //     break;

      //   default:
      //     throw new CustomError.BadRequestError('Invalid role provided.');
      // }

      return newUser;
    } catch (err) {
      throw err;
    }
  });

  return result;
};

const getSpecificUser = async (id: string) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new CustomError.BadRequestError('user not found');
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export default {
  createUser,
  getSpecificUser,
};
