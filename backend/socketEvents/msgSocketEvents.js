const msgService = require('../services/msgService');
const socketService = require('../services/socketService');


module.exports = addMsgEvents;

function addMsgEvents(socket){

    socket.on('chat msg', async msg => {
        console.log('ws in', 'chat msg', JSON.stringify(msg));

        await msgService.add(msg);

        // let targetSocket = sockets.find(currSocket => currSocket.userId === msg.to);
        let targetSocket = socketService.getByUserId(msg.to + '');
        //console.log('found target socket: ', !!targetSocket);

        if (targetSocket) targetSocket.emit('chat msg', msg);
    });

    socket.on('chat start typing', msg => {
        console.log('ws in', 'chat start typing', JSON.stringify(msg));

        //let targetSocket = sockets.find(currSocket => currSocket.userId === msg.to);
        let targetSocket = socketService.getByUserId(msg.to);
        //console.log('found target socket: ', !!targetSocket);

        if (targetSocket) targetSocket.emit('chat start typing', msg);
    });

    socket.on('chat finish typing', msg => {
        console.log('ws in', 'chat finish typing', JSON.stringify(msg));

        //let targetSocket = sockets.find(currSocket => currSocket.userId === msg.to);
        let targetSocket = socketService.getByUserId(msg.to);
        //console.log('found target socket: ', !!targetSocket);

        if (targetSocket) targetSocket.emit('chat finish typing', msg);
    });
}