import { SWRConfiguration } from 'swr';
import { SWRInfiniteConfiguration } from 'swr/infinite/dist/infinite';

import { Notification } from '@/types/domains/notification';
import { ApiPaths, getApiPath, getFetchKey } from '@/utils/route/apiPaths';

import { httpClient } from './helpers/httpClient';
import { useFetch } from './helpers/useFetch';
import { useInfiniteFetch } from './helpers/useInfiniteFetch';

class NotificationsRepository {
  private static instance: NotificationsRepository;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
  static getInstance() {
    if (!NotificationsRepository.instance) {
      NotificationsRepository.instance = new NotificationsRepository();
    }
    return NotificationsRepository.instance;
  }

  readNotifications = async () => {
    await httpClient.patch({
      url: getApiPath({ path: '/api/notifications' }),
    });
  };
}

export const notificationsRepository = NotificationsRepository.getInstance();

export const useNotifications = (
  limit: number,
  config?: SWRInfiniteConfiguration
) => {
  return useInfiniteFetch<Notification>(limit, ApiPaths.notifications, config);
};

export const useUnreadNotificationsCount = (config?: SWRConfiguration) => {
  return useFetch<number>(
    getFetchKey({ path: '/api/notifications/unreadCount' }),
    config
  );
};
