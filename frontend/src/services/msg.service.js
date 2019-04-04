import axios from './axios.wrapper.js';
import config from '@/config.js';

export default {
    //getEmptyMsg,
    getTopMsgs,
    markMsgAsRead,
    getMsgById
};

function getTopMsgs() {
    return axios.get(`${config.BASE_URL}/user-msg`)
        .then(res => {
            console.log('msg get all', res.data);
            return res.data;
        });
}

function markMsgAsRead(msgId) {
    return axios.put(`${config.BASE_URL}/msg/${msgId}`);
}

function getMsgById(msgId){
    return axios.get(`${config.BASE_URL}/msg/${msgId}`)
        .then(res => res.data);
}