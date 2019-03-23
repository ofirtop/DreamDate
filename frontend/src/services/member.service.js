import axios from 'axios';
import {socket} from './socket.js';
import store from '@/store.js';

const BASE_URL = 'http://localhost:3003'
export default {
    query,
    getMemberById,
    updateNotLikeMember
}

socket.on('member login', memberId=>{
    console.log('member login',memberId );
    store.dispatch({type: 'loginMember', memberId});
});
socket.on('member logout', memberId=>{
    console.log('member logout',memberId );
    store.dispatch({type: 'logoutMember', memberId});
});

// var members = [{_id: '111', name: 'Puki', age: 23}, {_id: '222', name: 'Muki', age: 33}, {_id: '333',name: 'Kuki', age: 43}]
// function query() {
//     return members;
// }
function query() {
    return axios.get(`${BASE_URL}/user`)
        .then(res => {
            let members = res.data;
            console.log('members', members);
            return members;
        });
}

function getMemberById(userId) {
    return axios.get(`${BASE_URL}/user/${userId}`)
        .then(res => res.data)
        .catch(err => console.log('Error:', err));
}

function updateNotLikeMember(memberIdToUpdate, loggedInUserId){
    return getMemberById(memberIdToUpdate)
        .then(memberToUpdate => {
            memberToUpdate.MemberWhoDidNotLikeMe.push(loggedInUserId)
            return axios.put(`${BASE_URL}/user/${memberIdToUpdate}`, memberToUpdate)
                .then(res => res.data._id)
    });
}