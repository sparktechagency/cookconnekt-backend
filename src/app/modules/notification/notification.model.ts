import mongoose, { model, Schema} from 'mongoose';
import { ENUM_NOTIFICATION_TYPE } from '../../../enums/notification-type';
import { INotification } from './notification.interface';

const notificationSchema = new Schema<INotification>(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isSeen: {
      type: Boolean,
      default: false,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(ENUM_NOTIFICATION_TYPE),
      required: true,
    },
    redirectId: {
      type: String,
      default: null,
    },
  },

  {
    timestamps: true,
  },
);

const Notification = model<INotification>('Notification', notificationSchema);

export default Notification;
