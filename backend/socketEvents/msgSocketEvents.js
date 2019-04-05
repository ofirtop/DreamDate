const msgService = require('../services/msgService');
const socketService = require('../services/socketService');


module.exports = addMsgEvents;

function addMsgEvents(socket) {

    socket.on('chat msg', async msg => {
        console.log('ws in:', 'chat msg', JSON.stringify(msg));

        await msgService.add(msg);

        let targetSocket = socketService.getByUserId(msg.to + '');

        if (targetSocket) {
            console.log('ws out:', 'chat msg', JSON.stringify(msg));
            targetSocket.emit('chat msg', msg);
        }
    });

    socket.on('chat start typing', msg => {
        console.log('ws in:', 'chat start typing', JSON.stringify(msg));

        let targetSocket = socketService.getByUserId(msg.to);

        if (targetSocket) {
            console.log('ws out:', 'chat start typing', JSON.stringify(msg));
            targetSocket.emit('chat start typing', msg);
        }
    });

    socket.on('chat finish typing', msg => {
        console.log('ws in:', 'chat finish typing', JSON.stringify(msg));

        let targetSocket = socketService.getByUserId(msg.to);

        if (targetSocket) {
            console.log('ws out:', 'chat finish typing', JSON.stringify(msg));
            targetSocket.emit('chat finish typing', msg);
        }
    });
}