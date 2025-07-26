import { Document } from "mongoose"
import { ENUM_BANNER_STATUS } from "../../../enums/banner";


export interface IBanner extends Document{
    title: string;
    description: string;
    image: string;
    status: ENUM_BANNER_STATUS.ACTIVE | ENUM_BANNER_STATUS.INACTIVE;
    createdAt: Date;
    updatedAt: Date;
}