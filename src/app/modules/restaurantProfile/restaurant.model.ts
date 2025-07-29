import mongoose, { Types } from 'mongoose';
import validator from 'validator';
import { IRestaurantsProfile } from './restaurant.interface';

const restaurantProfileSchema = new mongoose.Schema<IRestaurantsProfile>(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
    },
    restaurantName: {
      type: String,
      required: [true, 'full name is required!'],
    },
    businessType: {
      type: String,
      required: [true, 'business type is required!'],
    },
    city: {
      type: String,
      required: [true, 'city is required'],
    },

    address: {
      type: String,
      required: [true, 'city is required'],
    },

    businessEmail: {
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
    phone: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function (v) {
          return /^(\+?212)[ ]?\d{3}[ ]?\d{3}[ ]?\d{3}$/.test(v) || /^(\+?212)\d{9}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid morocco mobile phone number!`,
      },
    },
    socialLink: {
      type: String,
      required: [false, 'social link is not required'],
    },

    businessLogo: {
      type: String,
      required: [false, 'business logo is not required'],
    },

    banner: {
      type: String,
      required: [false, 'banner is not required'],
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

const RestaurantProfile = mongoose.model<IRestaurantsProfile>('restaurant', restaurantProfileSchema);

export default RestaurantProfile;


/*
{  
"fullName": "John Doe",
"phone": "212321123432"
  "currentPostion": "Head Chef",
  "specialties": ["Italian Cuisine", "Baking", "Grilling"],
  "experienceLevel": "less than 2 years",
  "yearsOfExperience": "10",
  "experienceList": [
    {
      "companyName": "Gourmet Kitchen",
      "position": "Sous Chef",
      "workPeriod": {
        "from": "2018-01-15T00:00:00.000Z",
        "to": "2021-06-30T00:00:00.000Z"
      }
    },
    {
      "companyName": "The Spice House",
      "position": "Line Cook",
      "workPeriod": {
        "from": "2015-03-01T00:00:00.000Z"
      }
    }
  ],
  "city": "New York",
  "adress": "123 Culinary Street, NY 10001"
}

*/