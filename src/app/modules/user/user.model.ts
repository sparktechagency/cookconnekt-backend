import bcrypt from 'bcrypt';
import mongoose, { Types } from 'mongoose';
import validator from 'validator';
import { ENUM_USER_ROLE, ENUM_USER_STATUS } from '../../../enums/user-role';
import IUser from './user.interface';

export const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required!'],
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: (props: { value: string }) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'Password is required!'],
      minlength: [8, 'Password must be at least 8 characters'],
      validate: {
        validator: function (value) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value);
        },
        message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
      },
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isProfileCompleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: {
        values: [ENUM_USER_STATUS.ACTIVE, ENUM_USER_STATUS.BLOCK, ENUM_USER_STATUS.DISABLED],
        message: '{VALUE} is not accepted as a status value. Use active/blocked/disabled.',
      },
      default: 'active',
    },
    verification: {
      code: {
        type: String,
        default: null,
      },
      expireDate: {
        type: Date,
        default: null,
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    profile: {
      id: {
        type: Types.ObjectId,
        refPath: 'profile.role',
        default: null,
      },
      role: {
        type: String,
        enum: [ENUM_USER_ROLE.COOK, ENUM_USER_ROLE.RESTAURANT],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', function (next) {
  const saltRounds = 10;
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }

  if (this.isModified('verification.code') && this.verification?.code) {
    this.verification.code = bcrypt.hashSync(this.verification.code, saltRounds);
  }

  next();
});

userSchema.methods.comparePassword = function (userPlanePassword: string) {
  return bcrypt.compareSync(userPlanePassword, this.password);
};

userSchema.methods.compareVerificationCode = function (userPlaneCode: string) {
  return bcrypt.compareSync(userPlaneCode, this.verification.code);
};

userSchema.set('toJSON', {
  versionKey: false,
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

userSchema.index({
  firstName: 'text',
  lastName: 'text',
  email: 'text',
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;

/*
yearOfExperience: string;
  Specialties: string[];
  city: string;
  cv: string;
  role: String,
  profileImage:string;
  foodImages: string[];
  currentPostion:string;

*/
