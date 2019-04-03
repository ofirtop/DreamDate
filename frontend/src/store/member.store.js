import memberService from '@/services/member.service.js'
import likeService from '@/services/like.service.js';
import userService from '@/services/user.service.js';


export default {
    state: {
        members: [],
    },
    mutations: {
        setMembers(state, { members }) {
            state.members = members
        },
        loadMemberById(state, { member }) {
            let idx = state.members.findIndex(item => item._id === member._id);
            if (idx > -1) state.members.splice(idx, 1, member);
        },
        addLikeToMember(state, { member }) {
            //mark member as liked and remove from list
            member.likes.iLike = true;
            let idx = state.members.findIndex(currMember => currMember._id === member._id)
            state.members.splice(idx, 1);
            console.log('added like to member', member);
        },
        addLikeFromMember(state, { member }) {
            console.log('addLikeFromMember', member.memberId);
            let memberFromStore = state.members.find(currMember => currMember._id === member._id);
            console.log('addLikeFromMember', memberFromStore);

            if (memberFromStore) {
                memberFromStore.likes.likeMe = true;
                memberFromStore.likes.isRead = false;
            }
        },
        loginMember(state, { memberId }) {
            let member = state.members.find(currMember => currMember._id === memberId);
            if (member) member.online = true;
        },
        logoutMember(state, { memberId }) {
            let member = state.members.find(currMember => currMember._id === memberId);
            if (member) member.online = false;
        },
        removeMemberIDontLike(state, { updatedMemberId }) {
           // console.log('about to remove member I dont like. memberId:', updatedMemberId)
            let idx = state.members.findIndex(member => member._id === updatedMemberId);
            state.members.splice(idx, 1);
        },
    },
    getters: {
        members(state) {
            return state.members;
        },
        memberById(state) {
            return (memberId) => {
                return state.members.find(member => member._id === memberId);
            }
        },
    },
    actions: {
        async loadMembers(context, { filterBy, routeName = 'home' }) {
            let members = null;

            if (routeName === 'home') members = await memberService.query(filterBy);
            else if (routeName === 'match') members = await memberService.queryMatch();

            context.commit({ type: 'setMembers', members });
        },
        loadMemberById({ commit }, { memberId }) {
            //console.log('loadMemberById', memberId);
            return memberService.getMemberById(memberId)
                .then(member => {
                    commit({ type: 'loadMemberById', member });
                    return member;
                })
        },
        async addLikeToMember({ commit, rootState }, { member }) {
            await likeService.add(rootState.userStore.loggedInUser._id, member._id);
            commit({ type: 'addLikeToMember', member });
        },
        notLikeMember({ commit }, { memberId }) {
            //console.log('store - action:notLikeMember() - memberId: ', memberId)
            memberService.updateNotLikeMember(memberId)
                .then((updatedMemberId) => commit({ type: 'removeMemberIDontLike', updatedMemberId }))
        }
    }
};