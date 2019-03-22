import Vue from 'vue'
import Vuex from 'vuex'
import memberService from '@/services/member.service.js'
import likeService from '@/services/like.service.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    members: [],
    loggedInUser: null,
    likes: new Map(),
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

      state.likes = likes.reduce((acc, like) => {
        let memberId = '';
        if (like.from === state.loggedInUser._id) {//member i like
          memberId = like.to;
          if (!acc.get(memberId)) acc.set(memberId, { iLikeMember: true, memberLikeMe: false });
          else acc.get(memberId).iLikeMember = true;
        }
        else {//member who likes me
          memberId = like.from;
          if (!acc.get(memberId)) acc.set(memberId, { iLikeMember: false, memberLikeMe: true });
          else acc.get(memberId).memberLikeMe = true;
        }
        return acc;
      }, new Map());
      console.log('store likes', state.likes);

    },
    addMemberILike(state, { memberId }) {
      let like = state.likes.get(memberId);
      if (!like) state.likes.set(memberId, { iLikeMember: true, memberLikeMe: false })
      else like.iLikeMember = true;
    },
    addMemberWhoLikesMe(state, { memberId }) {
      let like = state.likes.get(memberId);
      if (!like) state.likes.set(memberId, { iLikeMember: false, memberLikeMe: true })
      else like.memberLikeMe = true;
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
        let like = state.likes.get(memberId);
        if (!like) return false;
        return like.iLikeMember && like.memberLikeMe;
      }
    },
    likeStatus(state){
      return (memberId)=>{
        if(!state.likes) return '';
        let like = state.likes.get(memberId);
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
      //TODO load members by gender
      dispatch({ type: 'loadLikes' });//load in background. do not wait for proimse to resolve
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
    }
  }
})
