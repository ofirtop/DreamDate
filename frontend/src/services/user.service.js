import { SOCKET } from '@/socket.js';
import store from '@/store.js';
import axios from 'axios';

export default {
    login,
    logout
};

const BASE_URL = 'http://localhost:3003'

async function login(userCredentials) {
    console.log('logging in', userCredentials);
    try {
        let res = await axios.post(`${BASE_URL}/user/login`, userCredentials)
        let loggedInUser = res.data;
        SOCKET.emit('login', loggedInUser._id);
        return Promise.resolve(loggedInUser);
    } catch{
        console.log('login failed');
        return Promise.reject();
    }
}

async function logout(userCredentials) {
    console.log('loggint out');
    let res = await axios.get(`${BASE_URL}/user/logout`, userCredentials)
    SOCKET.emit('logout');
    return res.data;
}

