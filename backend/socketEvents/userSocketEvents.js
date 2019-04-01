const socketService = require('../services/socketService');


module.exports = addUserEvents;

function addUserEvents(socket){
    socket.on('login', userId => {
        console.log('ws in', 'login', userId);
        socket.userId = userId;
        // sockets.push(socket);
        socketService.add(socket);
        socket.broadcast.emit('member login', userId);
    });

    socket.on('logout', () => {
        console.log('ws in', 'logout', socket.userId);
        // let idx = sockets.findIndex(currSocket => currSocket.userId === socket.userId);
        // sockets.splice(idx, 1);
        socketService.remove(socket.userId);
        socket.broadcast.emit('member logout', socket.userId);
    });
}