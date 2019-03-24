import {SOCKET} from '@/socket.js';
import store from '@/store.js';
import axios from 'axios';

export default {
    loginDemo,
    login,
    logout
};

const BASE_URL = 'http://localhost:3003'


function loginDemo(user){
    SOCKET.emit('login', user._id);
}

async function login(userCredentials){
    console.log('logging in',userCredentials );
    let  res =  await axios.post(`${BASE_URL}/user/login`, userCredentials)
    let loggedInUser = res.data;
    SOCKET.emit('login', loggedInUser._id);
    return loggedInUser;
}

async function logout (userCredentials){
    console.log('loggint out');
    let  res =  await axios.get(`${BASE_URL}/user/logout`, userCredentials)
    return res.data;
}

