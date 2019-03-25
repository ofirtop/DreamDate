import { SOCKET } from '@/socket.js';
import store from '@/store.js';
import Axios from 'axios';

export default {
    login,
    logout,
    update
};

const BASE_URL = 'http://localhost:3003'

var axios = Axios.create({
	withCredentials: true
});

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

async function update(user) {
    try {
        //TODO delete axcess properties
        //TODO with Ofir
        await axios.put(`${BASE_URL}/user/${user._id}`, user);
    } catch{
        //TODO handle
    }
    return Promise.resolve();
}
