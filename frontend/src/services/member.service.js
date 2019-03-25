import { SOCKET } from '@/socket.js';
import store from '@/store.js';
import Axios from 'axios';
import { EVENT_BUS, EV_RECEIVED_LIKE } from '@/event-bus.js';

export default {
  query,
  getMemberById,
  updateNotLikeMember,
  getCities,
  watchMember
}

const BASE_URL = 'http://localhost:3003'

var axios = Axios.create({
  withCredentials: true
});

//temporary - until we have collection cities in DB 
var cities = ['Tel Aviv', 'Beer Sheva', 'Bat Yam', 'Ramat Gan', 'Herzlia', 'Petah Tikva', 'Haifa'];

_init();

function _init() {

  SOCKET.on('member login', memberId => {
    console.log('member login', memberId);
    store.commit({ type: 'loginMember', memberId });
  });

  SOCKET.on('member logout', memberId => {
    console.log('member logout', memberId);
    store.commit({ type: 'logoutMember', memberId });
  });

  SOCKET.on('members logged in', memberIds => {
    console.log('members logged in', memberIds);
    memberIds.forEach(memberId => store.commit({ type: 'loginMember', memberId }));
  });

  SOCKET.on('member is watching', ({ from }) => {
    console.log('ws in', 'member is watching', from);
    store.commit({ type: 'addWatchFromMember', memberId: from });
  });



  SOCKET.on('add like', async ({ from }) => {
    console.log('ws in', 'add like', from);
    let member = await getMemberById(from);

    // //TODO remove
    // member.likes = {
    //   iLike: !!((Math.floor(Math.random() * 10)) % 2),
    //   likeMe: true,
    //   isRead: false
    // };

    //console.log('member ', member);

    store.commit({ type: 'addLikeFromMember', member });
    EVENT_BUS.$emit(EV_RECEIVED_LIKE, member);
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
      members.forEach((member, idx) => member.online = false);
      console.log('members', members);
      return members;
    });
}


// function _loadLikes(likes) {

//   let likesMap = {};

//   likes.reduce((acc, like) => {
//     let memberId = '';
//     if (like.from === state.loggedInUser._id) {//member i like
//       memberId = like.to;
//       if (!acc[memberId]) acc[memberId] =
//         {
//           iLike: true,
//           likeMe: false,
//           isRead: false
//         };
//       else acc[memberId].iLike = true;
//     }
//     else {//member who likes me
//       memberId = like.from;
//       if (!acc[memberId]) acc[memberId] =
//         {
//           iLike: false,
//           likeMe: true,
//           isRead: like.isRead
//         };
//       else {
//         acc[memberId].likeMe = true;
//         acc[memberId].isRead = like.isRead;
//       }
//     }
//     return acc;
//   }, likesMap);

//   console.log('likesMap', likesMap);

//   state.members.forEach(member => {

//     let likesObj = likesMap[member._id];
//     if (likesObj) member.likes = likesObj;
//     else member.likes = {
//       iLike: false,
//       likeMe: false,
//       isRead: false
//     };
//   });

// }



function getMemberById(userId) {
  return axios.get(`${BASE_URL}/user/${userId}`)
    .then(res => res.data)
    .catch(err => console.log('Error:', err));
}

function updateNotLikeMember(memberIdToUpdate) {
  console.log(memberIdToUpdate);
  return axios.put(`${BASE_URL}/notlike`, { _id: memberIdToUpdate })
    .then(res => res.data._id)
}

async function watchMember(from, to) {
  try {
    /*
    TODO ask ofir how to update watch
    on server - add isRead: false, date: new Date()
    if exists - only update the date to now

    { id: memberId, isRead: false, date: new Date() }
    */

    let res = axios.post(`${BASE_URL}/user/watch`, { from, to });
  } catch{
    //TODO
  }
  SOCKET.emit('watch member', { from, to });


}