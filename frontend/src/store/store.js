import Vue from 'vue'
import Vuex from 'vuex'

import chatStore from './chat.store';
import userStore from './user.store';
import msgStore from './msg.store';
// import matchStore from './match.store';
import memberStore from './member.store';

// import likeService from '@/services/like.service.js';
// import userService from '@/services/user.service.js';
// import chatService from '@/services/chat.service.js';
// import msgService from '@/services/msg.service.js';
// import { EVENT_BUS, EV_CHAT_RECEIVED_MSG } from '@/event-bus.js';


Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {},
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    chatStore,
    userStore,
    msgStore,
   // matchStore,
    memberStore
  }
});