import { SOCKET } from '@/socket.js';
import store from '@/store.js';

export default {
    sendMsg,
    startTyping,
    getEmptyMsg,
    finishTyping
};

_init();

function _init() {
    SOCKET.on('chat msg', msg => {
        console.log('ws in:', 'chat msg', msg);
        store.dispatch({type: 'receiveChatMsgFromMember', msg});
    });

    SOCKET.on('chat start typing', msg => {
        console.log('ws in:', 'chat start typing', msg);
        store.commit({ type: 'setIsMemberTyping', isTyping: true });
    });

    SOCKET.on('chat finish typing', msg => {
        console.log('ws in:', 'chat finish typing', msg);
        store.commit({ type: 'setIsMemberTyping', isTyping: false });
    });
}

function sendMsg(msg) {
    console.log('ws out:', 'chat msg', msg.txt);
    SOCKET.emit('chat msg', msg);
}

function startTyping(msg) {
    console.log('ws out:', 'chat start typing');
    SOCKET.emit('chat start typing', msg);
}

function finishTyping(msg) {
    console.log('ws out:', 'chat finish typing');
    SOCKET.emit('chat finish typing', msg);
}

function getEmptyMsg(from, to) {
    return { from, to, txt: '' };
}