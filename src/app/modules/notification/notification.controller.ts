import { Request, Response } from 'express';

import handleAsync from '../../../shared/handleAsync';
import sendResponse from '../../../shared/sendResponse';

import { StatusCodes } from 'http-status-codes';
import notificationServices from './notification.services';

const getNotifications = handleAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const data = await notificationServices.getAllNotifications(req.query, userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Notification seen successfully',
    data: data,
  });
});

const markAsSeen = handleAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await notificationServices.markNotificationAsSeen(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Notification seen successfully',
    data: data,
  });
});

const getUnseenNotificationCount = handleAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;

  const count = await notificationServices.getAllUnseenNotificationCount(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'succes',
    message: 'Unseen notification count fetched successfully',
    data: count,
  });
});

export default {
  getNotifications,
  markAsSeen,
  getUnseenNotificationCount,
};
