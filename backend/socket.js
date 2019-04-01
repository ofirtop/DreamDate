const socketService = require('./services/socketService');

const addLikeEvents = require('./socketEvents/likeSocketEvents');
const addMsgEvents = require('./socketEvents/msgSocketEvents');
const addUserEvents = require('./socketEvents/userSocketEvents');
const addWatchEvents = require('./socketEvents/watchSocketEvents');

module.exports = {
    init,
};

function init(io) {

    io.on('connection', socket => {
        console.log('ws in', 'user connected');

        addUserEvents(socket);
        addLikeEvents(socket);
        addMsgEvents(socket);
        addWatchEvents(socket);

        socket.on('disconnect', () => {
            console.log('ws in', 'user disconnected', socket.userId);
            // let idx = sockets.findIndex(currSocket => currSocket.userId === socket.userId);
            // if (idx >= 0) sockets.splice(idx, 1);
            socketService.remove(socket.userId);
            socket.broadcast.emit('member logout', socket.userId);
        });
    });
}