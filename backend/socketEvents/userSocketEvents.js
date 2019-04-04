const socketService = require('../services/socketService');


module.exports = addUserEvents;

function addUserEvents(socket){
    socket.on('login', userId => {
        console.log('ws in:', 'login', userId);
        socket.userId = userId;

        socketService.add(socket);

        console.log('ws out (broadcast):', 'member login', userId);
        socket.broadcast.emit('member login', userId);
    });

    socket.on('logout', () => {
        console.log('ws in:', 'logout', socket.userId);

        socketService.remove(socket.userId);
        
        console.log('ws out (broadcast):', 'member logout', userId);
        socket.broadcast.emit('member logout', socket.userId);
    });
}