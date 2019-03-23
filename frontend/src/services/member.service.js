import axios from 'axios'
const BASE_URL = 'http://localhost:3003'
export default {
    query,
    getMemberById,
    updateNotLikeMember,
    getCities
}
//temporary - until we have collection cities in DB 
var cities = ['Tel Aviv', 'Beer Sheva', 'Bat Yam', 'Ramat Gan', 'Herzlia', 'Petah Tikva', 'Haifa'];

function getCities() {
    return cities
}

function query(filter) {
    return axios.get(`${BASE_URL}/user/?gender=${filter.gender}&&minAge=${filter.minAge}&&maxAge=${filter.maxAge}&&minHeight=${filter.minHeight}&&City=${filter.city}`)
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
