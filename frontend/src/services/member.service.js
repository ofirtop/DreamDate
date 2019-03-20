const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? '/'
    : '//localhost:3003/';
    
export default {
    query,
    removeItem
}
// var members = [{_id: '111', name: 'Puki', age: 23}, {_id: '222', name: 'Muki', age: 33}, {_id: '333',name: 'Kuki', age: 43}]
// function query() {
//     return members;
// }
function query() {
    return axios.get('/user')
        .then(res => members = res.data);
}

function removeItem(itemId) {
    return axios.delete(`${BASE_URL}toy/${itemId}`)
        .then(() => itemId)
}
