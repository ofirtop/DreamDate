module.exports = {
    add,
    remove,
    getByUserId
};

const sockets = [];

function add(socket) {
    sockets.push(socket);
    return Promise.resolve();
}

function remove(userId) {
    let idx = sockets.findIndex(currSocket => currSocket.userId === userId);
    if (idx >= 0) sockets.splice(idx, 1);
    return Promise.resolve();
}

function getByUserId(userId) {
    //console.log('sockets', sockets.map(sock => sock.userId));

    let socket = sockets.find(currSocket => {
        //console.log('currSocket', currSocket.userId, 'userId:', userId);
        return currSocket.userId === userId
    });
    return socket;
}