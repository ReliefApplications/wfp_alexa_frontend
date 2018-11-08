self.addEventListener('push', function(event) {
  let data = JSON.parse(event.data.text());
  const title = data.title;
  const options = {
    body: data.message,
    icon: null
  };

  event.waitUntil(self.registration.showNotification(title, options));
});