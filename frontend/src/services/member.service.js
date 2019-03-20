export default {
    query,
}
// var members = [{_id: '111', name: 'Puki', age: 23}, {_id: '222', name: 'Muki', age: 33}, {_id: '333',name: 'Kuki', age: 43}]
// function query() {
//     return members;
// }
function query() {
    return axios.get('/user')
        .then(res => members = res.data);
}