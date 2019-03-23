import Vue from 'vue'
import Vuex from 'vuex'
import memberService from '@/services/member.service.js'
import likeService from '@/services/like.service.js';
import userService from '@/services/user.service.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    members: [],
    loggedInUser: null,
    likesMap: {},
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
    setLikes(state, { likes }) {
      likes.reduce((acc, like) => {
        let memberId = '';
        if (like.from === state.loggedInUser._id) {//member i like
          memberId = like.to;
          if (!acc[memberId]) acc[memberId] = { iLikeMember: true, memberLikeMe: false };
          else acc[memberId].iLikeMember = true;
        }
        else {//member who likes me
          memberId = like.from;
          if (!acc[memberId]) acc[memberId] = { iLikeMember: false, memberLikeMe: true };
          else acc[memberId].memberLikeMe = true;
        }
        return acc;
      }, state.likesMap);

      console.log('store likes', state.likesMap);

    },
    addMemberILike(state, { memberId }) {
      let like = state.likesMap[memberId];
      if (!like) state.likesMap[memberId] = { iLikeMember: true, memberLikeMe: false };
      else like.iLikeMember = true;
      console.log('added like to member', memberId, state.likesMap[memberId]);
    },
    addMemberWhoLikesMe(state, { memberId }) {
      let like = state.likesMap[memberId];
      if (!like) state.likesMap[memberId] = { iLikeMember: false, memberLikeMe: true };
      else like.memberLikeMe = true;
      console.log('added like from member', memberId, state.likesMap[memberId]);
    },
    loginMember(state, {memberId}){
      let member = state.members.find(currMember => currMember._id === memberId);
      member.online = true;
      console.log('loginMember', member);
    },
    logoutMember(state, {memberId}){
      let member = state.members.find(currMember => currMember._id === memberId);
      member.online = false;
      console.log('logoutMember', member);
    }
  },
  getters: {
    members(state) {
      return state.members
    },
    loggedInUser(state) {
      return state.loggedInUser;
    },
    isMatch(state) {//returns a function. hack for getter with params
      return (memberId) => {
        let like = state.likesMap[memberId];
        if (!like) return false;
        return like.iLikeMember && like.memberLikeMe;
      }
    },
    likeStatus(state) {
      return (memberId) => {
        let like = state.likesMap[memberId];
        if (!like) return '';
        if (like.iLikeMember && like.memberLikeMe) return 'match';
        if (like.iLikeMember) return 'i like';
        else if (like.memberLikeMe) return 'likes me';
      };
    }
  },
  actions: {
    loadMembers(context) {
      return memberService.query()
        .then(members => {
          context.commit({ type: 'setMembers', members });
        })
    },
    setDemoUser({ commit, state, dispatch }, { gender }) {
      let demoUser = state.members.find(member => member.gender === gender);
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
      commit({ type: 'setLikes', likes });
    },
    async addLike({ commit, state }, { memberId }) {
      await likeService.add(state.loggedInUser._id, memberId);
      commit({ type: 'addMemberILike', memberId });
    },
    receiveLikeFromMember({ commit }, { memberId }) {
      commit({ type: 'addMemberWhoLikesMe', memberId });
    },
    loginMember({commit}, {memberId}){
      commit({type: 'loginMember', memberId});
    },
    logoutMember({commit}, {memberId}){
      commit({type: 'logoutMember', memberId});
    }
  }
})
