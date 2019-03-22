import Vue from 'vue'
import Vuex from 'vuex'
import memberService from '@/services/member.service.js'
import likeService from '@/services/like.service.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    members: [],
    loggedInUser: null,
    membersILike: new Map(),
    membersWhoLikeMe: new Map()
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

      state.membersILike = likes
        .filter(like => like.from === state.loggedInUser._id)
        .reduce((acc, like) => {
          return acc.set(like.to, like);
        }, new Map());

      state.membersWhoLikeMe = likes
        .filter(like => like.to === state.loggedInUser._id)
        .reduce((acc, like) => {
          return acc.set(like.from, like)
        }, new Map());
    },
    addMemberILike(state, { memberId }) {
      state.membersILike.set(memberId);
    },
    addMemberWhoLikesMe(state, { memberId }) {
      state.membersWhoLikeMe.set(memberId);
    }
  },
  getters: {
    members(state) {
      return state.members
    },
    loggedInUser(state) {
      return state.loggedInUser;
    },
    isMatch: (state) => {//returns a function. hack for getter with params
      return (memberId) => {
        return !!state.membersWhoLikeMe.get(memberId);
      }
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
      console.log('likes loaded. membersILike:', state.membersILike);
      console.log('likes loaded. membersWhoLikeMe:', state.membersWhoLikeMe);
    },
    async addLike({ commit, state }, { memberId }) {
      await likeService.add(state.loggedInUser._id, memberId);
      commit({ type: 'addMemberILike', memberId });
    }
  }
})
