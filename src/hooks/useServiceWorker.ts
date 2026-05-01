'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useNotificationStore } from '@/store/notificationStore';

type NotifyPayload = {
  title: string;
  body: string;
  tag?: string;
  patientId?: string;
};

async function dispatchNotification(
  reg: ServiceWorkerRegistration | null,
  payload: NotifyPayload,
) {
  const { title, body, tag = 'carewise-alert', patientId } = payload;

  // Prefer SW showNotification (works in background); fall back to Notification constructor
  const sw = reg?.active ?? reg?.waiting ?? reg?.installing;
  if (sw) {
    sw.postMessage({ type: 'CAREWISE_NOTIFY', title, body, tag, patientId });
  } else {
    // Direct API fallback — works when SW hasn't activated yet
    new Notification(title, { body, icon: '/icon.svg', tag });
  }
}

export function useServiceWorker() {
  const [swReady, setSwReady] = useState(false);
  const { enabled, setEnabled } = useNotificationStore();
  const regRef = useRef<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Sync enabled state with actual browser permission on mount
    if ('Notification' in window && Notification.permission === 'granted') {
      setEnabled(true);
    }

    if (!('serviceWorker' in navigator)) {
      // No SW support — mark ready so Notification fallback can be used
      setSwReady(true);
      return;
    }

    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        regRef.current = reg;
        setSwReady(true);
      })
      .catch(() => {
        // Registration failed — still mark ready for direct Notification fallback
        setSwReady(true);
      });
  }, [setEnabled]);

  /**
   * Request permission (first time) then fire a notification.
   * Can be called with an explicit payload or with defaults.
   */
  const sendNotification = useCallback(
    async (payload?: Partial<NotifyPayload>) => {
      if (!('Notification' in window)) return;

      let permission = Notification.permission;
      if (permission === 'default') {
        permission = await Notification.requestPermission();
      }
      if (permission !== 'granted') return;

      setEnabled(true);

      await dispatchNotification(regRef.current, {
        title: payload?.title ?? 'CareWise Clinical Alert',
        body:  payload?.body  ?? 'A patient requires immediate attention.',
        tag:   payload?.tag   ?? 'carewise-alert',
        patientId: payload?.patientId,
      });
    },
    [setEnabled],
  );

  /** Convenience: alert for a specific patient */
  const notifyPatient = useCallback(
    (name: string, message: string, patientId?: string) =>
      sendNotification({ title: `Alert: ${name}`, body: message, tag: patientId, patientId }),
    [sendNotification],
  );

  const ready = swReady;

  return { ready, enabled, notify: sendNotification, notifyPatient };
}
