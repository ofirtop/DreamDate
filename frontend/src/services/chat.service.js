import { SOCKET } from '@/socket.js';
import store from '@/store.js';
import axios from './axios.wrapper.js';

export default {
    sendMsg,
    startTyping,
    getEmptyMsg,
    finishTyping,
    getMsgHistory,
    getTopMsgs
};

const BASE_URL = process.env.NODE_ENV !== 'development'? '' : '//localhost:3003';

_init();

function _init() {
    SOCKET.on('chat msg', msg => {
        console.log('ws in:', 'chat msg', msg);
        store.dispatch({ type: 'receiveChatMsgFromMember', msg });
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

function getMsgHistory(memberId) {
    return axios.get(`${BASE_URL}/msg/${memberId}`)
        .then(res => {
            console.log('msg history', res.data);
           return res.data;
        });
}

function getTopMsgs(){
    return axios.get(`${BASE_URL}/msg`)
        .then(res => {
            console.log('msg get all', res.data);
           return res.data;
        });
}