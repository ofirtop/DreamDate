import axios from 'axios'
const BASE_URL = 'http://localhost:3003'
export default {
    query,
    removeItem
}

// var members = [{_id: '111', name: 'Puki', age: 23}, {_id: '222', name: 'Muki', age: 33}, {_id: '333',name: 'Kuki', age: 43}]
// function query() {
//     return members;
// }
function query() {
    console.log('AXIOS!');
    
    return axios.get(`${BASE_URL}/user`)
        .then(res => res.data);
}
