import { SOCKET } from '@/socket.js';
import store from '@/store.js';

export default {
    sendMsg,
    startTyping,
    getEmptyMsg
};

_init();

function _init() {
    SOCKET.on('chat msg to', msg => {
        console.log('received chat msg:', msg.txt);
        store.commit({ type: 'addChatMsg', msg });
    });

    SOCKET.on('chat msg start typing', msg => {
        console.log('received chat msg start typint...', msg.txt);
        // store.commit({type: 'addChatMsg', msg});
    });
}

function sendMsg(msg) {
    console.log('sending chat msg:', msg.txt);
    SOCKET.emit('chat msg from', msg);
}

function startTyping(msg) {
    console.log('start typing chat msg...');
    SOCKET.emit('chat msg start typing', msg);
}

function getEmptyMsg(fromId, toId) {
    return { fromId, toId, txt: '' };
}