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
    let strUrl = `${BASE_URL}/user/?`
    if(filter.gender) strUrl += `gender=${filter.gender}`
    if(filter.minAge) strUrl += `&&minAge=${filter.minAge}`
    if(filter.maxAge) strUrl += `&&maxAge=${filter.maxAge}`
    if(filter.minHeight) strUrl += `&&minHeight=${filter.minHeight}`
    if(filter.city) strUrl += `&&city=${filter.city}`
    return axios.get(strUrl)
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
