

import { Document, Types } from 'mongoose';

interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  phone: string;
  password: string;
  status: string;
  isEmailVerified: boolean;
  verification?: {
    code: string;
    expireDate: Date;
  };
  isDeleted: boolean;
  profile: Types.ObjectId | null
  role: string,
  createdAt: Date;
  updatedAt: Date;
  comparePassword(userPlanePassword: string): boolean
  compareVerificationCode(userPlaneCode: string): boolean;
}

export default IUser;
