import { SOCKET } from '@/socket.js';
import store from '@/store/store';
import axios from './axios.wrapper.js';
import config from '@/config.js';

export default {
    add
};

_init();

function _init() {
    SOCKET.on('member add like to user', ({ from }) => {
        console.log('ws in:', 'member add like to user', from);
        store.dispatch({ type: 'getLikeFromMember', memberId: from });
    });
}

async function add(from, to) {
    //console.log('like.service:add() memberId:',to)
    await axios.put(`${config.BASE_URL}/like`, { _id: to });
    let obj = { from, to };
    SOCKET.emit('user add like to member', obj);
}