import { SOCKET } from '@/socket.js';
import store from '@/store.js';
import Axios from 'axios';

export default {
    login,
    logout,
    updateUser,
    signup,
    // addNewUser
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

async function updateUser(user) {
    return await axios.put(`${BASE_URL}/user/${user._id}`, user)
            .then(res => res.data)
}
async function signup(userCredentials) {
    console.log('signing in (ServiceClient)', userCredentials);
    try {
        let res = await axios.post(`${BASE_URL}/user/signup`, userCredentials)
        let loggedInUser = res.data;
        SOCKET.emit('login', loggedInUser._id);
        return Promise.resolve(loggedInUser);
    } catch(err){
        console.log('signup failed! Error: ', err);
        return Promise.reject();
    }
}
//FOR NEW USER - AFTER SIGNUP IS READY TO USE
// async function addNewUser(user) {
//     return axios.post(`${BASE_URL}/user`, user)
//         .then(res => res.data)
// }

// function _getEmptyUser() {
//     return {
//         "name" : "", 
//         "pass" : "", 
//         "email" : "", 
//         "gender" : "", 
//         "dateOfBirth" : "", 
//         "city" : "", 
//         "maritalStatus" : "", 
//         "numOfChildren" : NumberInt(), 
//         "height" : NumberInt(), 
//         "interestedIn" : {
//             "minAge" : NumberInt(), 
//             "maxAge" : NumberInt(), 
//             "gender" : ""
//         }, 
//         "mainImage" : "", 
//         "images" : [
//             "", 
//             ""
//         ], 
//     }
// }