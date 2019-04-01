import { SOCKET } from '@/socket.js';
import axios from './axios.wrapper.js';
import config from '@/config.js';

export default {
    login,
    logout,
    updateUser,
    signup,
    // addNewUser
};

async function login(userCredentials) {
    console.log('logging in', userCredentials);
    try {
        let res = await axios.post(`${config.BASE_URL}/user/login`, userCredentials)
        let loggedInUser = res.data;
        SOCKET.emit('login', loggedInUser._id);
        return Promise.resolve(loggedInUser);
    } catch(err){
        console.log('login failed', err);
        return Promise.reject();
    }
}

async function logout(userCredentials) {
    console.log('loggint out');
    let res = await axios.get(`${config.BASE_URL}/user/logout`, userCredentials)
    SOCKET.emit('logout');
    return res.data;
}

async function updateUser(user) {
    console.log('service front, updating user:', user);
    
    return await axios.put(`${config.BASE_URL}/user/${user._id}`, user)
            .then(res => {
                console.log(res.data);
                return res.data})
}
async function signup(userCredentials) {
    console.log('signing in (ServiceClient)', userCredentials);
    try {
        let res = await axios.post(`${config.BASE_URL}/user/signup`, userCredentials)
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
//     return axios.post(`${config.BASE_URL}/user`, user)
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