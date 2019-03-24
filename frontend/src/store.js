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
      isTyping: false
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
    loadLikes(state, { likes }) {

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
    setIsTypingChatMsg(state, isTyping) {
      state.chat.isTyping = isTyping;
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
    }
  },
  actions: {
    loadMembers(context, { filterBy }) {   
      return memberService.query(filterBy)
        .then(members => {
          context.commit({ type: 'setMembers', members });
        })
    },
    setDemoUser({ commit, state, dispatch }, { gender }) {
      let demoUser = null;
      if (gender === 'random') demoUser = state.members[1];
      else demoUser = state.members.find(member => member.gender === gender);
      commit({ type: 'setLoggedInUser', user: demoUser });
      console.log('user login (demo)', demoUser._id);

      //TODO load members by gender
      dispatch({ type: 'loadLikes' });//load in background. do not wait for proimse to resolve
      userService.loginDemo(demoUser);

      return Promise.resolve();
    },
    loadMemberById({ commit }, { memberId }) {
      return memberService.getMemberById(memberId)
        .then(member => {
          commit({ type: 'loadMemberById', member });
          return member;
        })
    },
    async loadLikes({ commit, state }) {
      let likes = await likeService.query(state.loggedInUser._id);
      commit({ type: 'loadLikes', likes });
    },
    async addLikeToMember({ commit, state }, { member }) {
      await likeService.add(state.loggedInUser._id, member._id);
      commit({ type: 'addLikeToMember', member });
    },
    receiveLikeFromMember({ commit }, { memberId }) {
      commit({ type: 'addMemberWhoLikesMe', memberId });
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
      commit({ type: 'setIsTypingChatMsg', isTyping: false });

    },
    startTypingChatMsg({ commit }, { msg }) {
      chatService.startTyping(msg);
      commit({ type: 'setIsTypingChatMsg', isTyping: true });
    }
  }
});