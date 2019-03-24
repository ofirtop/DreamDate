import axios from 'axios';
import { SOCKET } from '@/socket.js';
import store from '@/store.js';

const BASE_URL = 'http://localhost:3003'
export default {
    query,
    getMemberById,
    updateNotLikeMember,
    getCities
}
//temporary - until we have collection cities in DB 
var cities = ['Tel Aviv', 'Beer Sheva', 'Bat Yam', 'Ramat Gan', 'Herzlia', 'Petah Tikva', 'Haifa'];

_init();

function _init() {

    SOCKET.on('member login', memberId => {
        console.log('member login', memberId);
        store.dispatch({ type: 'loginMember', memberId });
    });

    SOCKET.on('member logout', memberId => {
        console.log('member logout', memberId);
        store.dispatch({ type: 'logoutMember', memberId });
    });

}

function getCities() {
    return cities
}

function query(filter) {
    let strUrl = `${BASE_URL}/user/?`
    if (filter.gender) strUrl += `gender=${filter.gender}`
    if (filter.minAge) strUrl += `&&minAge=${filter.minAge}`
    if (filter.maxAge) strUrl += `&&maxAge=${filter.maxAge}`
    if (filter.minHeight) strUrl += `&&minHeight=${filter.minHeight}`
    if (filter.city) strUrl += `&&city=${filter.city}`
    return axios.get(strUrl)
        .then(res => {
            let members = res.data;

            members.forEach((member, idx) =>{
            //temp - add likes
            member.likes =
            {
                iLike: idx % 3 === 0,
                likeMe: idx % 2 === 0,
                isRead: false
              };
            });

            console.log('members', members);
            return members;
        });
}

function _loadLikes( likes ) {

    let likesMap = {};

    likes.reduce((acc, like) => {
      let memberId = '';
      if (like.from === state.loggedInUser._id) {//member i like
        memberId = like.to;
        if (!acc[memberId]) acc[memberId] =
          {
            iLike: true,
            likeMe: false,
            isRead: false
          };
        else acc[memberId].iLike = true;
      }
      else {//member who likes me
        memberId = like.from;
        if (!acc[memberId]) acc[memberId] =
          {
            iLike: false,
            likeMe: true,
            isRead: like.isRead
          };
        else {
          acc[memberId].likeMe = true;
          acc[memberId].isRead = like.isRead;
        }
      }
      return acc;
    }, likesMap);

    console.log('likesMap', likesMap);

    state.members.forEach(member => {

      let likesObj = likesMap[member._id];
      if (likesObj) member.likes = likesObj;
      else member.likes = {
        iLike: false,
        likeMe: false,
        isRead: false
      };
    });

  }



function getMemberById(userId) {
    return axios.get(`${BASE_URL}/user/${userId}`)
        .then(res => res.data)
        .catch(err => console.log('Error:', err));
}

function updateNotLikeMember(memberIdToUpdate, loggedInUserId) {
    return getMemberById(memberIdToUpdate)
        .then(memberToUpdate => {
            memberToUpdate.MemberWhoDidNotLikeMe.push(loggedInUserId)
            return axios.put(`${BASE_URL}/user/${memberIdToUpdate}`, memberToUpdate)
                .then(res => res.data._id)
        });
}
