import { Document, Types } from 'mongoose';
import { ENUM_USER_ROLE } from '../../../enums/user-role';

interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  status: string;
  isEmailVerified: boolean;
  isProfileCompleted: boolean;
  verification?: {
    code: string;
    expireDate: Date;
  };
  isDeleted: boolean;
  profile: {
    id: Types.ObjectId | null;
    role: ENUM_USER_ROLE.COOKS | ENUM_USER_ROLE.RESTAURANT;
  };
  createdAt: Date;
  updatedAt: Date;
  comparePassword(userPlanePassword: string): boolean;
  compareVerificationCode(userPlaneCode: string): boolean;
}

export default IUser;
