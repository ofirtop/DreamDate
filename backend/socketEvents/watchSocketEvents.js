module.exports = addWatchEvents;

function addWatchEvents(socket){
    socket.on('watch member', payload => {
        console.log('ws in', 'watch member', payload);

        //let targetSocket = sockets.find(currSocket => currSocket.userId === payload.to);
        let targetSocket = socketService.getByUserId(payload.to);
        console.log('found target socket: ', !!targetSocket);

        if (targetSocket) targetSocket.emit('member is watching', payload);
    });
}