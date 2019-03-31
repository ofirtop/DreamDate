import Vue from 'vue'
import Vuex from 'vuex'
import memberService from '@/services/member.service.js'
import likeService from '@/services/like.service.js';
import userService from '@/services/user.service.js';
import chatService from '@/services/chat.service.js';
import { EVENT_BUS, EV_CHAT_RECEIVED_MSG } from '@/event-bus.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    members: [],
    matches: [],
    msgs: [],
    loggedInUser: null,
    chat: {
      msgs: [],
      member: null,
      isMemberTyping: false
    }
  },
  mutations: {
    setMembers(state, { members }) {
      state.members = members
    },
    setMatches(state, { members }) {
      state.matches = members
    },
    setLoggedInUser(state, { user }) {
      state.loggedInUser = user;
    },
    loadMemberById(state, { member }) {
      let idx = state.members.findIndex(item => item._id === member._id);
      if (idx > -1) state.members.splice(idx, 1, member);
    },
    addLikeToMember(state, { member }) {
      member.likes.iLike = true;
      let idx = state.members.findIndex(currMember => currMember._id === member._id)
      state.members.splice(idx, 1, member);
      console.log('added like to member', member);
    },
    addLikeFromMember(state, { member }) {
      console.log('addLikeFromMember', member.memberId);
      let memberFromStore = state.members.find(currMember => currMember._id === member._id);
      console.log('addLikeFromMember', memberFromStore);

      if (memberFromStore) {
        memberFromStore.likes.likeMe = true;
        memberFromStore.likes.isRead = false;
      }
    },
    addWatchFromMember(state, { memberId }) {
      let member = state.loggedInUser.membersWhoWatchedMe.find(currMember => currMember.id === memberId)
      if (member) member.date = new Date();
      else {
        state.loggedInUser.membersWhoWatchedMe.push({ id: memberId, isRead: false, date: new Date() });
      }
    },
    markWatchedMeMembersAsRead(state) {
      state.loggedInUser.membersWhoWatchedMe.forEach(member => {
        member.isRead = true;
      });
    },
    loginMember(state, { memberId }) {
      let member = state.members.find(currMember => currMember._id === memberId);
      if (member) member.online = true;
    },
    logoutMember(state, { memberId }) {
      let member = state.members.find(currMember => currMember._id === memberId);
      if (member) member.online = false;
    },
    removeMemberIDontLike(state, { updatedMemberId }) {
      console.log('about to remove member I dont like. memberId:', updatedMemberId)
      let idx = state.members.findIndex(member => member._id === updatedMemberId);
      state.members.splice(idx, 1);
    },
    addChatMsg(state, { msg }) {
      state.chat.msgs.push(msg);
      state.chat.isMemberTyping = false;
    },
    addChatHistoryMsgs(state, { msgs }) {
      state.chat.msgs = msgs;
    },
    startChat(state, { member }) {
      state.chat.member = member;
    },
    setIsMemberTyping(state, { isTyping }) {
      state.chat.isMemberTyping = isTyping;
    },
    endChat(state) {
      state.chat.member = null;
      state.chat.msgs = [];
    },
    addMsgs(state, {msgs}){
      state.msgs = msgs;
    }
  },
  getters: {
    members(state) {
      return state.members
    },
    matches(state) {
      return state.matches;
    },
    memberById(state) {
      return (memberId) => {
        return state.members.find(member => member._id === memberId);
      }
    },
    loggedInUser(state) {
      return state.loggedInUser;
    },
    chatMsgs(state) {
      return state.chat.msgs;
    },
    isMemberTyping(state) {
      return state.chat.isMemberTyping;
    },
    newMembersWhoWatchedCount(state) {
      if (state.loggedInUser) {
        return state.loggedInUser.membersWhoWatchedMe.filter(member => !member.isRead).length;
      }
    },
    msgs(state){
      return state.msgs;
    }
  },
  actions: {
    loadMembers(context, { filterBy }) {
      return memberService.query(filterBy)
        .then(members => {
          context.commit({ type: 'setMembers', members });
        })
    },
    loadMemberById({ commit }, { memberId }) {
      return memberService.getMemberById(memberId)
        .then(member => {
          commit({ type: 'loadMemberById', member });
          return member;
        })
    },
    async addLikeToMember({ commit, state }, { member }) {
      await likeService.add(state.loggedInUser._id, member._id);
      commit({ type: 'addLikeToMember', member });
    },
    async updateUser({ commit }, { user }) {
      await userService.updateUser(user);
      commit({ type: 'setLoggedInUser', user });

    },
    async addNewUser({ commit }, { user }) {
      let newUser = await userService.addNewUser(user);
      commit({ type: 'setLoggedInUser', user: newUser })
    },
    async loginUser({ commit }, { userCredentials }) {
      try {
        let loggedInUser = await userService.login(userCredentials);
        commit({ type: 'setLoggedInUser', user: loggedInUser });
        console.log('logged in:', loggedInUser._id);
        return Promise.resolve(loggedInUser);
      } catch{
        return Promise.reject();
      }
    },
    async logoutUser({ commit }) {
      await userService.logout();
      commit({ type: 'setLoggedInUser', user: null });
      console.log('logged out');
    },
    async signupUser({ commit }, { userCredentials }) {
      try {
        let loggedInUser = await userService.signup(userCredentials);
        commit({ type: 'setLoggedInUser', user: loggedInUser });
        console.log('logged in:', loggedInUser._id);
        return Promise.resolve(loggedInUser);
      } catch{
        return Promise.reject();
      }
    },
    loadMatches(context) {
      return memberService.queryMatch()
        .then(members => {
          context.commit({ type: 'setMatches', members });
        })
    },
    notLikeMember({ commit, state }, { memberId }) {
      console.log('store - action:notLikeMember() - memberId: ', memberId)
      memberService.updateNotLikeMember(memberId)
        .then((updatedMemberId) => commit({ type: 'removeMemberIDontLike', updatedMemberId }))
    },
    sendChatMsg({ commit }, { msg }) {
      chatService.sendMsg(msg);
      commit({ type: 'addChatMsg', msg });
    },
    startTyping({ }, { msg }) {
      chatService.startTyping(msg);
    },
    finishTyping({ }, { msg }) {
      chatService.finishTyping(msg);
    },
    receiveChatMsgFromMember({ commit }, { msg }) {
      commit({ type: 'addChatMsg', msg });
      EVENT_BUS.$emit(EV_CHAT_RECEIVED_MSG, msg);
    },
    watchMember({ state }, { memberId }) {
      memberService.watchMember(state.loggedInUser._id, memberId);
    },
    markWatchedMeMembersAsRead({ commit, state }) {
      commit({ type: 'markWatchedMeMembersAsRead' });
      return userService.update(state.loggedInUser);
    },
    async getMsgHistory({ commit }, { memberId }) {
      let msgs = await chatService.getMsgHistory(memberId);
      commit({ type: 'addChatHistoryMsgs', msgs });
    },
    async getTopMsgs({commit, state}){
      let msgs = await chatService.getTopMsgs(state.loggedInUser._id);
      commit({type: 'addMsgs', msgs});
    }
  }
});