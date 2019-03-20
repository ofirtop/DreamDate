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
    loadMembers(context) {   
      return memberService.query()
        .then(members => {
          context.commit({ type: 'setMembers', members });
        })
    },
    setDemoUser({ commit }, { user }) {
      commit({type: 'setLoggedInUser', user });
      return Promise.resolve();
    }
  }
})
