import {SOCKET} from '@/socket.js';
import store from '@/store.js';

export default {
    loginDemo
};

function loginDemo(user){
    SOCKET.emit('login', user._id);
}