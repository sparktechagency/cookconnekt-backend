import { Document, Types } from 'mongoose';

interface IUser extends Document {
  role: any;
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
    role: string;
  };
  createdAt: Date;
  updatedAt: Date;
  comparePassword(userPlanePassword: string): boolean;
  compareVerificationCode(userPlaneCode: string): boolean;
}

export default IUser;
