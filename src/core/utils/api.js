import openSocket from 'socket.io-client';
const socket = openSocket('https://wfp-alexa-socket.test.humanitarian.tech/');

function subscribeToDashboardChanges(callback) {
  socket.on('dashboardChanges', (userId, country, data) => {
    // if(userId === '78910') {
      callback(userId, country, JSON.parse(data));
    // }
  });
}

function subscribeToDashboardFocus(callback) {
  socket.on('dashboardFocus', (userId, number, country, data) => {
    // if(userId === '78910') {
      callback(userId, number, country, JSON.parse(data));
    // }
  });
}

export { subscribeToDashboardChanges, subscribeToDashboardFocus }