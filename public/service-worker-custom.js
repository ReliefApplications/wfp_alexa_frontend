self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data:`);

  let data = JSON.parse(event.data.text());
  const title = data.title;
  const options = {
    body: data.message,
    icon: null
  };

  event.waitUntil(self.registration.showNotification(title, options)
   //  .then(function() {
   //    clients.matchAll({type: 'window'}).then(function (clientList) {
   //      if (clientList.length > 0) {
   //        messageToClient(clientList[0], {
   //          message: self.pushData.body // suppose it is: "Hello World !"
   //        });
   //      }
   //    });
   // }
  // )
  );
});

function messageToClient(client, data) {
  return new Promise(function(resolve, reject) {
    const channel = new MessageChannel();

    channel.port1.onmessage = function(event){
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
    };

    client.postMessage(JSON.stringify(data), [channel.port2]);
  });
}

// self.addEventListener('push', function (event) {
//   if (event && event.data) {
//     self.pushData = event.data.json();
//     if (self.pushData) {
//       event.waitUntil(self.registration.showNotification(self.pushData.title, {
//         body: self.pushData.body,
//         icon: self.pushData.data ? self.pushData.data.icon : null
//       }).then(function() {
//         clients.matchAll({type: 'window'}).then(function (clientList) {
//           if (clientList.length > 0) {
//             messageToClient(clientList[0], {
//               message: self.pushData.body // suppose it is: "Hello World !"
//             });
//           }
//         });
//       }));
//     }
//   }
// });