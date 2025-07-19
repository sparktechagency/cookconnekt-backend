import config from '../../../config';

import registrationEmailTemplate from '../../../mailTemplate/registrationTemplate';
import IdGenerator from '../../../utilities/idGenerator';
import sendMail from '../../../utilities/sendEmail';
import CustomError from '../../errors';
import IUser from './user.interface';
import User from './user.model';

const createUser = async (data: IUser,role:string) => {
  const verificationCode = IdGenerator.generateNumberId();
  const expireDate = new Date();
  const expireTime = 10;
  expireDate.setMinutes(expireDate.getMinutes() + expireTime);

  const userData = {
    email: data.email,
    password: data.password,
    profile: {
      role: role
    },
    verification: {
      code: verificationCode,
      expireDate,
    },
  };

  const newUser: any = await User.create(userData);
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

  return newUser;
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
