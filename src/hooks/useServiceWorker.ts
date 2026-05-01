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

    // SW registered only for background push — not used for triggering
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, [setEnabled]);

  const sendNotification = useCallback(
    async (payload?: Partial<NotifyPayload>) => {
      if (!('Notification' in window)) return;

      // Only await permission request — everything else is synchronous
      // to preserve the user gesture context required by the browser
      if (Notification.permission === 'default') {
        const result = await Notification.requestPermission();
        if (result !== 'granted') return;
      }
      if (Notification.permission !== 'granted') return;

      setEnabled(true);

      // Fire immediately — no SW await, no async gap, gesture context intact
      new Notification(payload?.title ?? 'CareWise Clinical Alert', {
        body: payload?.body ?? 'A patient requires immediate attention.',
        icon: '/icon.svg',
        tag:  payload?.tag  ?? 'carewise-alert',
      });
    },
    [setEnabled],
  );

  const notifyPatient = useCallback(
    (name: string, message: string, patientId?: string) =>
      sendNotification({ title: `Alert: ${name}`, body: message, tag: patientId }),
    [sendNotification],
  );

  return { enabled, notify: sendNotification, notifyPatient };
}
