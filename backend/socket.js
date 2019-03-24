module.exports = initSocket;

function initSocket(io) {
    const connectedSockets = [];

    io.on('connection', socket => {
        console.log('ws in', 'user connected');
        connectedSockets.push(socket);

        socket.on('disconnect', () => {
            console.log('ws in', 'user disconnected', socket.userId);
            let idx = connectedSockets.findIndex(currSocket => currSocket.userId === socket.userId);
            if (idx >= 0) connectedSockets.splice(idx, 1);
            socket.broadcast.emit('member logout', socket.userId);
        });

        socket.on('login', userId => {
            console.log('ws in', 'login', userId);
            socket.userId = userId;
            socket.broadcast.emit('member login', userId);
        });

        socket.on('logout', () => {
            console.log('ws in', 'logout', socket.userId);
            socket.broadcast.emit('member logout', socket.userId);
        });

        socket.on('chat msg', msg => {
            console.log('ws in', 'chat msg', msg);

            let targetSocket = connectedSockets.find(currSocket => currSocket.userId === msg.toId);
            console.log('found target socket: ', !!targetSocket);

            if (targetSocket) targetSocket.emit('chat msg to', msg);
        });

        socket.on('chat start typing', msg => {
            console.log('chat start typing', msg);

            let targetSocket = connectedSockets.find(currSocket => currSocket.userId === msg.toId);
            console.log('found target socket: ', !!targetSocket);

            if (targetSocket) targetSocket.emit('chat start typing', msg);
        });

        socket.on('chat finish typing', msg => {
            console.log('chat finish typing', msg);

            let targetSocket = connectedSockets.find(currSocket => currSocket.userId === msg.toId);
            console.log('found target socket: ', !!targetSocket);

            if (targetSocket) targetSocket.emit('chat finish typing', msg);
        });
    });
}