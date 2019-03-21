import axios from 'axios'
const BASE_URL = 'http://localhost:3003'
export default {
    query,
    getMemberById
}

// var members = [{_id: '111', name: 'Puki', age: 23}, {_id: '222', name: 'Muki', age: 33}, {_id: '333',name: 'Kuki', age: 43}]
// function query() {
//     return members;
// }
function query() {
    return axios.get(`${BASE_URL}/user`)
        .then(res => res.data);
}
function getMemberById(userId) {
    return axios.get (`${BASE_URL}/user/${userId}`)
        .then(res => res.data)
        .catch(err => console.log('Error:', err))
}