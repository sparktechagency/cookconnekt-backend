import { Types } from 'mongoose';
import { ENUM_NOTIFICATION_TYPE } from '../../../enums/notification-type';


export interface INotification {
    title: string;
    message: string;
    isSeen: boolean;
    receiver: Types.ObjectId;
    type: (typeof ENUM_NOTIFICATION_TYPE)[keyof typeof ENUM_NOTIFICATION_TYPE];
    redirectId?: string;
}
