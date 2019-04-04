const socketService = require('../services/socketService');

module.exports = addWatchEvents;

function addWatchEvents(socket) {
    socket.on('user is watching member', payload => {
        console.log('ws in:', 'user is watching member', JSON.stringify(payload));

        let targetSocket = socketService.getByUserId(payload.to);

        if (targetSocket) {
            console.log('ws out:', 'member is watching user', JSON.stringify(payload));
            targetSocket.emit('member is watching user', payload);
        }
    });
}