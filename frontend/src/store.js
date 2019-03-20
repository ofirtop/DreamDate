import Vue from 'vue'
import Vuex from 'vuex'
import memberService from './services/member.service.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    members: []
  },
  mutations: {
    setMembers(state, {members}) {
      state.members = members
    },
  },
  getters: {
    members(state) {
      return state.members
    }
  },
  actions: {
    loadMembers(context) {   
      return memberService.query()
        .then(members => {
          context.commit({ type: 'setMembers', members });
        })
    },
  }
})
