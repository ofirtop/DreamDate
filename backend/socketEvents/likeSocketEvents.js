const socketService = require('../services/socketService');

module.exports = addLikeEvents;

function addLikeEvents(socket){
    socket.on('add like', payload => {
        console.log('ws in', 'add like', JSON.stringify(payload));

        //let targetSocket = sockets.find(currSocket => currSocket.userId === payload.to);
        let targetSocket = socketService.getByUserId(payload.to);
        //console.log('found target socket: ', !!targetSocket);

        if (targetSocket) targetSocket.emit('add like', payload);
    });
}