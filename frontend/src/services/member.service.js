import { SOCKET } from '@/socket.js';
import store from '@/store/store';
import axios from './axios.wrapper.js';
import config from '@/config.js';
import { EVENT_BUS, EV_RECEIVED_LIKE } from '@/event-bus.js';

export default {
  query,
  queryMatch,
  getMemberById,
  updateNotLikeMember,
  getCities,
  watchMember
}

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

  SOCKET.on('member is watching', ({ from }) => {
    console.log('ws in', 'member is watching', from);
    store.commit({ type: 'addWatchFromMember', memberId: from });
  });

  SOCKET.on('add like', async ({ from }) => {
    console.log('ws in', 'add like', from);
    let member = await getMemberById(from);
    store.commit({ type: 'addLikeFromMember', member });
    EVENT_BUS.$emit(EV_RECEIVED_LIKE, member);
  });
}

function getCities() {
  return cities
}

function query(filter) {
  let strUrl = `${config.BASE_URL}/user/?`
  if (filter.gender) strUrl += `gender=${filter.gender}`
  if (filter.minAge) strUrl += `&&minAge=${filter.minAge}`
  if (filter.maxAge) strUrl += `&&maxAge=${filter.maxAge}`
  if (filter.minHeight) strUrl += `&&minHeight=${filter.minHeight}`
  if (filter.city) strUrl += `&&city=${filter.city}`
  return axios.get(strUrl)
    .then(res => res.data);
}

function queryMatch() {
  let strUrl = `${config.BASE_URL}/match`
  return axios.get(strUrl)
    .then(res => res.data);
}

function getMemberById(userId) {
  return axios.get(`${config.BASE_URL}/user/${userId}`)
    .then(res => res.data)
    .catch(err => console.log('Error:', err));
}

function updateNotLikeMember(memberIdToUpdate) {
  console.log(memberIdToUpdate);
  return axios.put(`${config.BASE_URL}/notlike`, { _id: memberIdToUpdate })
    .then(res => {
      console.log('member.service: updateNotLikeMember() res.data._id: ', res.data._id)
      return res.data._id
    })
}

 async function watchMember(from, to) {
  // try {
  //   /*
  //   TODO ask ofir how to update watch
  //   on server - add isRead: false, date: new Date()
  //   if exists - only update the date to now

  //   { id: memberId, isRead: false, date: new Date() }
  //   */

  //   let res = axios.post(`${config.BASE_URL}/user/watch`, { from, to });
  // } catch{
  //   //TODO
  // }
  // SOCKET.emit('watch member', { from, to });
 }