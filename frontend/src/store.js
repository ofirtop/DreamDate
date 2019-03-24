import Vue from 'vue'
import Vuex from 'vuex'
import memberService from './services/member.service.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    members: [],
    loggedInUser: null
  },
  mutations: {
    setMembers(state, { members }) {
      state.members = members
    },
    setLoggedInUser(state, { user }) {
      state.loggedInUser = user;
    },
    loadMemberById(state, { member}) {
      let idx = state.members.findIndex(item => item._id === member._id);
      state.members.splice(idx, 1, member);
    },
    removeMemberIDontLike(state, { updatedMemberId }){
      let idx = state.members.findIndex(member => member._id === updatedMemberId);
      state.members.splice(idx, 1);
    }
  },
  getters: {
    members(state) {
      return state.members
    },
    loggedInUser(state){
      return state.loggedInUser;
    }
  },
  actions: {
    loadMembers(context, { filterBy }) {   
      return memberService.query(filterBy)
        .then(members => {
          context.commit({ type: 'setMembers', members });
        })
    },
    setDemoUser({ commit, state }, { gender }) {
      let demoUser = state.members.find(member => member.gender === gender);
      commit({type: 'setLoggedInUser', user: demoUser });
      //TODO load members by gender
      return Promise.resolve();
    },
    loadMemberById({ commit }, {memberId}) {
      return memberService.getMemberById(memberId)
        .then(member => {
          commit({type: 'loadMemberById', member});
          return member;
          })
    },
    notLikeMember({ commit, state }, {memberId}) {
      memberService.updateNotLikeMember(memberId, state.loggedInUser._id)
        .then(updatedMemberId => commit({type: 'removeMemberIDontLike', updatedMemberId }))
    }
  }
})
