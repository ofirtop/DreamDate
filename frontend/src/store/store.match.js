export default {
    state: {
        match: ''
    },
    getters: {
        match(state) {
            return state.match;
        }
    },
    mutations: {
        addMatch(state, { member }) {
            console.log('addMatch mutation ', member);
            state.match = member;            
        },
        removeMatch(state){
            console.log('mutation:removeMatch');
            state.match = '';

        }
    },
    actions: {
        addMatch({ commit }, { member }) {
            console.log('addMatch actions: ', member);
            commit({ type: 'addMatch', member });
        },
        removeMatch({commit}){
            console.log('action:removeMatch');
            commit({type:"removeMatch"})

        }
    }
};