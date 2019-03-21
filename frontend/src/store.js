import Vue from 'vue'
import Vuex from 'vuex'
import memberService from './services/member.service.js'
import likeService from './services/like.service.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    members: [],
    membersWhoLikeMe: [],
    loggedInUser: null,
  },
  mutations: {
    setMembers(state, { members }) {
      state.members = members
    },
    setLoggedInUser(state, { user }) {
      state.loggedInUser = user;
    },
    setMembersWhoLikeMe(state, { members }) {
      state.membersWhoLikeMe = members;
    },
  },
  getters: {
    members(state) {
      return state.members
    },
    loggedInUser(state) {
      return state.loggedInUser;
    },
    membersWhoLikeMe(state){
      return state.membersWhoLikeMe;
    }
  },
  actions: {
    loadMembers(context) {
      return memberService.query()
        .then(members => {
          context.commit({ type: 'setMembers', members });
        })
    },
    setDemoUser({ commit, state }, { gender }) {
      let demoUser = state.members.find(member => member.gender === gender);
      commit({ type: 'setLoggedInUser', user: demoUser });
      //TODO load members by gender
      let membersWhoLikeMe = likeService.queryMembersWhoLikeMe(state.loggedInUser._id, state.members);
      commit({type:'setMembersWhoLikeMe', members: membersWhoLikeMe});
      return Promise.resolve();
    }
  }
})
