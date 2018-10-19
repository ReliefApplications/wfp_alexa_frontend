import openSocket from 'socket.io-client';
const socket = openSocket('http://217.70.189.97:12112');

function subscribeToDashboardChanges(callback) {
  socket.on('dashboardChanges', (userId, country, data) => {
    // if(userId === '78910') {
      callback(userId, country, JSON.parse(data));
    // }
  });
}

export { subscribeToDashboardChanges }