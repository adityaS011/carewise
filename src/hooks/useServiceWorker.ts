'use client';

import { useCallback, useEffect } from 'react';
import { useNotificationStore } from '@/store/notificationStore';

type NotifyPayload = {
  title: string;
  body: string;
  tag?: string;
  patientId?: string;
};

export function useServiceWorker() {
  const { enabled, setEnabled } = useNotificationStore();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ('Notification' in window && Notification.permission === 'granted') {
      setEnabled(true);
    }

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.error('CareWise service worker registration failed:', error);
      });
    }
  }, [setEnabled]);

  const sendNotification = useCallback(
    async (payload?: Partial<NotifyPayload>) => {
      if (!('Notification' in window)) return;
      if (!('serviceWorker' in navigator)) return;

      if (Notification.permission === 'default') {
        const result = await Notification.requestPermission();
        if (result !== 'granted') return;
      }
      if (Notification.permission !== 'granted') return;

      setEnabled(true);

      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(payload?.title ?? 'CareWise Clinical Alert', {
        body: payload?.body ?? 'A patient requires immediate attention.',
        icon: '/icon.svg',
        badge: '/icon.svg',
        tag: payload?.tag ?? 'carewise-alert',
        data: { patientId: payload?.patientId },
      });
    },
    [setEnabled],
  );

  const notifyPatient = useCallback(
    (name: string, message: string, patientId?: string) =>
      sendNotification({ title: `Alert: ${name}`, body: message, tag: patientId, patientId }),
    [sendNotification],
  );

  return { enabled, notify: sendNotification, notifyPatient };
}
