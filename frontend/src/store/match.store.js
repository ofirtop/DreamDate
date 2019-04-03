// import memberService from '@/services/member.service.js'

// export default {
//     state: {
//         matches: [],
//     },
//     mutations: {
//         setMatches(state, { members }) {
//             state.matches = members
//         },
//     },
//     getters: {
//         matches(state) {
//             return state.matches;
//         },
//     },
//     actions: {
//         loadMatches(context) {
//             return memberService.queryMatch()
//                 .then(members => {
//                     context.commit({ type: 'setMatches', members });
//                 })
//         },
//     }
// };