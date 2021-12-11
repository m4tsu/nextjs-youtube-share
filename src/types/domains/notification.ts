import { User } from './user';

import { Notification as PrismaNotification } from '.prisma/client';
export type Notification = PrismaNotification & {
  notifier: User;
};
