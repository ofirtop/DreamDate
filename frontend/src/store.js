import Vue from 'vue'
import Vuex from 'vuex'

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
    loadToys(context) {   
      return memberService.query()
        .then(members => {
          context.commit({ type: 'setMembers', members });
        })
    },
  }
})
