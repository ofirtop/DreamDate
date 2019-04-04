import { SOCKET } from '@/socket.js';
import store from '@/store/store';
import axios from './axios.wrapper.js';
import config from '@/config.js';

export default {
    sendMsg,
    startTyping,
    finishTyping,
    getHistoryMsgs,
};

_init();

function _init() {
    SOCKET.on('chat msg', msg => {
        console.log('ws in:', 'chat msg', msg);
        store.dispatch({ type: 'receiveChatMsg', msg });
    });

    SOCKET.on('chat start typing', msg => {
        console.log('ws in:', 'chat start typing', msg);
        store.dispatch({ type: 'receiveMemberStartTyping', msg });
    });

    SOCKET.on('chat finish typing', msg => {
        console.log('ws in:', 'chat finish typing', msg);
        store.dispatch({ type: 'receiveMemberStopTyping', msg });
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

async function getHistoryMsgs(memberId) {
    let msgs = await axios.get(`${config.BASE_URL}/user-msg/${memberId}`).then(res => res.data);
    console.log('msg history', msgs);
    return msgs;
}