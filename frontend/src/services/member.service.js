import axios from 'axios'
const BASE_URL = 'http://localhost:3003'
export default {
    query,
    removeItem,
    saveUser,
    getEmpty
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

function removeItem(userId) {
    return axios.delete(`${BASE_URL}user/${userId}`)
        .then(() => userId)
}

function saveUser(user) {
    let isIdExists = !!user._id;
    if (isIdExists) return axios.put(`${BASE_URL}toy/${user._id}`, user) //update
        .then((res) => {
            console.log('UPDATE TOY: ', res.data)
            return res.data
        })
    else return axios.post(`${BASE_URL}toy/`, user) //save New
        .then(res => res.data)
}

function getEmpty() {
    return  {
        name: '',
        pass: '',
        email: '',
        gender: '',
        dateOfBirth: '',
        city: '',
        maritalStatus: '',
        numOfChildren: 0,
        height: 0,
        interestedIn: {
            minAge: 0,
            maxAge: 0,
            gender: ""
        },
        mainImage: "",
        images: [
            "",
            ""
        ],
        membersILike: [],
        membersWhoLikeMe: [],
        membersIWatched: [],
        membersWhoWatchedMe: []
    }
}