import mongoose, { Types } from 'mongoose';
import { ICooksProfile, IExperience } from './cooks.interface';

const ExperienceSchema = new mongoose.Schema<IExperience>(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    workPeriod: {
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
        required: false,
      },
    },
  },
  { _id: false },
);

const cooksProfileSchema = new mongoose.Schema<ICooksProfile>(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
    },
    fullName: {
      type: String,
      required: [true, 'full name is required!'],
    },
    city: {
      type: String,
      required: [true, 'city is required'],
    },
    adress: {
      type: String,
      required: [true, 'adress is required'],
    },
    phone: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid 10-digit phone number!`,
      },
    },
    specialties: {
      type: [String],
      required: [true, 'specialists is required'],
    },
    yearsOfExperience: {
      type: String,
      required: [true, 'year of experience is required'],
    },
    currentPostion: {
      type: String,
      required: [true, 'current position is required'],
    },
    experienceLevel: {
      type: String,
      required: [true, 'experience level is required'],
    },
    experienceList: {
      type: [ExperienceSchema],
      default: [],
    },

    cv: {
      type: String,
      required: [true, 'cv is required'],
    },
    rating: {
      type: Number,
      required: false,
      default: 0,
    },

    profileImage: {
      type: String,
      required: [false, 'profile image is optional'],
      default: '',
    },
    foodImages: {
      type: [String],
      required: [true, 'food image is required'],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const cookProfile = mongoose.model<ICooksProfile>('cookProfile', cooksProfileSchema);

export default cookProfile;
