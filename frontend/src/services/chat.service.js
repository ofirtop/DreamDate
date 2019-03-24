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
        console.log('ws in:','chat msg to', msg);
        store.commit({ type: 'addChatMsg', msg });
    });

    SOCKET.on('chat start typing', msg => {
        console.log('ws in:', 'chat start typing', msg);
         store.commit({type: 'setIsMemberTyping', isTyping:true});
    });
}

function sendMsg(msg) {
    console.log('ws out:','chat msg', msg.txt);
    SOCKET.emit('chat msg', msg);
}

function startTyping(msg) {
    console.log('ws out:','chat start typing');
    SOCKET.emit('chat start typing', msg);
}

function getEmptyMsg(fromId, toId) {
    return { fromId, toId, txt: '' };
}