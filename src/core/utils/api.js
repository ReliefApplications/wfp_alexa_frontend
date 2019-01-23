import openSocket from 'socket.io-client';
const socket = openSocket('https://wfp-alexa-socket.test.humanitarian.tech/');

function subscribeToDashboardChanges(callback) {
  socket.on('dashboardChanges', (accessToken, country, data) => {
      callback(accessToken, country, JSON.parse(data));
  });
}

function subscribeToDashboardFocus(callback) {
  socket.on('dashboardFocus', (accessToken, number, country, data) => {
      callback(accessToken, number, country, JSON.parse(data));
  });
}

export { subscribeToDashboardChanges, subscribeToDashboardFocus }
