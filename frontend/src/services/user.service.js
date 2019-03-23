import {socket} from './socket.js';
import store from '@/store.js';

export default {
    loginDemo
};

function loginDemo(user){
    socket.emit('login', user._id);
}