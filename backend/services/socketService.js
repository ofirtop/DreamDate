module.exports = {
    add,
    remove,
    getByUserId
};

const sockets = [];

function add(socket){
    sockets.push(socket);
    return Promise.resolve();
}

function remove(userId){
    let idx = sockets.findIndex(currSocket => currSocket.userId === userId);
    if (idx >= 0) sockets.splice(idx, 1);
    return Promise.resolve();
}

function getByUserId(userId){
    let socket = sockets.find(currSocket => currSocket.userId === userId);
    return socket;
}