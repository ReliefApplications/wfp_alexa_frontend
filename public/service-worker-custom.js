self.addEventListener('push', function(event) {
  let data = JSON.parse(event.data.text());
  const title = data.title;
  const options = {
    body: data.message,
    icon: null,
    data: {url: data.url}
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
