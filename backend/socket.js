const msgService = require('./services/msgService');
const userService = require('./services/userService');
const socketService = require('./services/socketService');

module.exports = {
    init,
};

function init(io) {

    io.on('connection', socket => {
        console.log('ws in', 'user connected');

        socket.on('disconnect', () => {
            console.log('ws in', 'user disconnected', socket.userId);
            // let idx = sockets.findIndex(currSocket => currSocket.userId === socket.userId);
            // if (idx >= 0) sockets.splice(idx, 1);
            socketService.remove(socket.userId);
            socket.broadcast.emit('member logout', socket.userId);
        });

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

        socket.on('chat msg', async msg => {
            msg.timestamp = Date.now();
            console.log('ws in', 'chat msg', msg);


            // let targetSocket = sockets.find(currSocket => currSocket.userId === msg.to);
            let targetSocket = socketService.getByUserId(msg.to);
            console.log('found target socket: ', !!targetSocket);

            if (targetSocket) targetSocket.emit('chat msg', msg);

            try {
                await msgService.add(msg)
            } catch (err) {
                console.error('error', err);
            }
        });

        socket.on('chat start typing', msg => {
            console.log('chat start typing', msg);

            //let targetSocket = sockets.find(currSocket => currSocket.userId === msg.to);
            let targetSocket = socketService.getByUserId(msg.to);
            console.log('found target socket: ', !!targetSocket);

            if (targetSocket) targetSocket.emit('chat start typing', msg);
        });

        socket.on('chat finish typing', msg => {
            console.log('ws in', 'chat finish typing', msg);

            //let targetSocket = sockets.find(currSocket => currSocket.userId === msg.to);
            let targetSocket = socketService.getByUserId(msg.to);
            console.log('found target socket: ', !!targetSocket);

            if (targetSocket) targetSocket.emit('chat finish typing', msg);
        });

        socket.on('add like', payload => {
            console.log('ws in', 'add like', payload);

            //let targetSocket = sockets.find(currSocket => currSocket.userId === payload.to);
            let targetSocket = socketService.getByUserId(payload.to);
            console.log('found target socket: ', !!targetSocket);

            if (targetSocket) targetSocket.emit('add like', payload);
        });

        socket.on('watch member', payload => {
            console.log('ws in', 'watch member', payload);

            //let targetSocket = sockets.find(currSocket => currSocket.userId === payload.to);
            let targetSocket = socketService.getByUserId(payload.to);
            console.log('found target socket: ', !!targetSocket);

            if (targetSocket) targetSocket.emit('member is watching', payload);
        });

    });
}