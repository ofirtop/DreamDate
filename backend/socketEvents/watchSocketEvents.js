const socketService = require('../services/socketService');

module.exports = addWatchEvents;

function addWatchEvents(socket){
    socket.on('user is watching member', payload => {
        console.log('ws in', 'user is watching member', payload);

        //let targetSocket = sockets.find(currSocket => currSocket.userId === payload.to);
        let targetSocket = socketService.getByUserId(payload.to);
        console.log('found target socket: ', !!targetSocket);

        if (targetSocket) {
        console.log('ws out', 'member is watching user', payload);
        targetSocket.emit('member is watching user', payload);
        }
    });
}