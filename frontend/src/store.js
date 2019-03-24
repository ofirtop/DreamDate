import Vue from 'vue'
import Vuex from 'vuex'
import memberService from '@/services/member.service.js'
import likeService from '@/services/like.service.js';
import userService from '@/services/user.service.js';
import chatService from '@/services/chat.service.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    members: [],
    loggedInUser: null,
    chat: {
      msgs: [],
      member: null,
      isMemberTyping: false,
      isWindowOpen:false
    }
  },
  mutations: {
    setMembers(state, { members }) {
      state.members = members
    },
    setLoggedInUser(state, { user }) {
      state.loggedInUser = user;
    },
    loadMemberById(state, { member }) {
      let idx = state.members.findIndex(item => item._id === member._id);
      state.members.splice(idx, 1, member);
    },
    addLikeToMember(state, { member }) {
      member.likes.iLike = true;
      console.log('added like to member', member);
    },
    addMemberWhoLikesMe(state, { memberId }) {
      let member = state.members.find(currMember => currMember._id === memberId);
      if (member) {
        member.likes.likeMe = true;
        member.likes.isRead = false;
      }
      console.log('added like from member', memberId, member.likes);
    },
    loginMember(state, { memberId }) {
      let member = state.members.find(currMember => currMember._id === memberId);
      member.online = true;
      console.log('loginMember', member);
    },
    logoutMember(state, { memberId }) {
      let member = state.members.find(currMember => currMember._id === memberId);
      if (member) member.online = false;
      console.log('logoutMember', member);
    },
    removeMemberIDontLike(state, { updatedMemberId }) {
      let idx = state.members.findIndex(member => member._id === updatedMemberId);
      state.members.splice(idx, 1);
    },
    addChatMsg(state, { msg }) {
      state.chat.msgs.push(msg);
    },
    startChat(state, { member }) {
      state.chat.member = member;
    },
    setIsMemberTyping(state, { isTyping }) {
      state.chat.isMemberTyping = isTyping;
    }
  },
  getters: {
    members(state) {
      return state.members
    },
    loggedInUser(state) {
      return state.loggedInUser;
    },
    chatMsgs(state) {
      return state.chat.msgs;
    },
    isMemberTyping(state) {
      return state.chat.isMemberTyping;
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
    receiveLikeFromMember({ commit }, { memberId }) {
      commit({ type: 'addMemberWhoLikesMe', memberId });
    },
    async loginUser({ commit }, { userCredentials }) {
      let loggedInUser = await userService.login(userCredentials);
      commit({ type: 'setLoggedInUser', user: loggedInUser });
      console.log('logged in:', loggedInUser._id);
      return Promise.resolve();
    },
    async logoutUser({ commit }) {
      await userService.logout();
      commit({ type: 'setLoggedInUser', user: null });
      console.log('logged out');
    },
    loginMember({ commit }, { memberId }) {
      commit({ type: 'loginMember', memberId });
    },
    logoutMember({ commit }, { memberId }) {
      commit({ type: 'logoutMember', memberId });
    },
    notLikeMember({ commit, state }, { memberId }) {
      memberService.updateNotLikeMember(memberId, state.loggedInUser._id)
        .then(updatedMemberId => commit({ type: 'removeMemberIDontLike', updatedMemberId }))
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
    }
  }
});