const socketService = require('../services/socketService');

module.exports = addLikeEvents;

function addLikeEvents(socket){
    socket.on('user add like to member', payload => {
        console.log('ws in:', 'user add like to member', JSON.stringify(payload));

        //let targetSocket = sockets.find(currSocket => currSocket.userId === payload.to);
        let targetSocket = socketService.getByUserId(payload.to);
        console.log('found target socket: ', !!targetSocket);
        console.log('found target socket: ', !!targetSocket);
        
        if (targetSocket) {
            console.log('ws out:', 'member add like to user', JSON.stringify(payload));
            targetSocket.emit('member add like to user', payload);
        }
    });
}