import { SOCKET } from '@/socket.js';
import store from '@/store.js';
import Axios from 'axios';

export default {
    query,
    add
};

const BASE_URL = 'http://localhost:3003'

var axios = Axios.create({
    withCredentials: true
});



_init();

function _init() {
    SOCKET.on('like', memberId => {
        console.log('received like', memberId);
        store.dispatch({ type: 'receiveLikeFromMember', memberId });
    });
}

let likes = [];

function _createLikes(userId = '5c921ba999879a164c7df9ed') {
    likes.push(_createLike(userId, '5c921ba999879a164c7df9f5'));
    likes.push(_createLike(userId, '5c921ba999879a164c7df9ed'));
    likes.push(_createLike('5c921ba999879a164c7df9f5', userId, true));
    likes.push(_createLike('5c921ba999879a164c7df9ed', userId, true));
    likes.push(_createLike('5c921ba999879a164c7df9ef', userId, false));


    console.log('likeService. _createLikes. likes:', likes);

    // setTimeout(() => {
    //     likes.push(_createLike('5c921ba999879a164c7df9fd', userId));
    // }, 60 * 1000);
}

function _createLike(from, to, isRead) {
    return { from, to, isRead };
}

function query(userId) {
    _createLikes(userId);
    return Promise.resolve(likes);
}

function add(memberId) {
    console.log('like.service:add() memberId:',memberId)
    return axios.put(`${BASE_URL}/like`, {_id: memberId})
        .then(res => {
            console.log('FRONT: like.service:add() - res received from server: ',res.data);
            return res.data
        })
}
