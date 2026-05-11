self.addEventListener('install', (e) => e.waitUntil(self.skipWaiting()));
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('message', (event) => {
  if (event.data?.type !== 'CAREWISE_NOTIFY') return;

  const { title = 'CareWise Alert', body = '', tag = 'carewise-alert', patientId } = event.data;

  // event.waitUntil keeps the SW alive until showNotification resolves
  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: '/icon.svg',
      badge: '/icon.svg',
      tag,
      data: { patientId },
      requireInteraction: false,
      silent: false,
    })
  );
});

// Clicking the notification focuses the app.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = event.notification.data?.patientId
    ? `/patients/${event.notification.data.patientId}`
    : '/';

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        const existing = clientList.find((c) => 'focus' in c);
        if (existing) {
          existing.navigate(targetUrl);
          return existing.focus();
        }
        return clients.openWindow(targetUrl);
      })
  );
});
