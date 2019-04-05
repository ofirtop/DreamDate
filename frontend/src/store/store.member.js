import memberService from '@/services/member.service.js'
import likeService from '@/services/like.service.js';


export default {
    state: {
        members: [],
        currMember: null
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
        currMember(state) {
            return state.currMember;
        }
    },
    mutations: {
        setMembers(state, { members }) {
            state.members = members
        },
        loadMemberById(state, { member }) {
            state.currMember = member;

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
        getLikeFromMember(state, { memberId }) {
            let member = state.members.find(currMember => currMember._id === memberId);
            if (member) {
                member.likes.likeMe = true;
                member.likes.isRead = false;
            }
        },
        updateMemberOnlineStatus(state, { memberId, isOnline }) {
            let member = state.members.find(currMember => currMember._id === memberId);
            if (member) member.online = isOnline;
            if (state.currMember && state.currMember._id === memberId) state.currMember.online = isOnline;
        },
        removeMemberIDontLike(state, { updatedMemberId }) {
            // console.log('about to remove member I dont like. memberId:', updatedMemberId)
            let idx = state.members.findIndex(member => member._id === updatedMemberId);
            state.members.splice(idx, 1);
        },
        removeAllMembers(state) {
            state.members = [];
        }
    },
    actions: {
        async loadMembers(context, { filterBy, routeName = 'home' }) {
            let members = null;

            if (routeName === 'home') members = await memberService.query(filterBy);
            else if (routeName === 'match') members = await memberService.queryMatch();

            context.commit({ type: 'setMembers', members });
        },
        async removeAllMembers({ commit }) {
            commit({ type: 'removeAllMembers' });
        },
        async loadMemberById({ commit }, { memberId }) {
            //console.log('loadMemberById', memberId);
            let member = await memberService.getMemberById(memberId);
            commit({ type: 'loadMemberById', member });
            return member;
        },
        async addLikeToMember({ commit, rootState }, { member }) {
            await likeService.add(rootState.userStore.loggedInUser._id, member._id);            
            commit({ type: 'addLikeToMember', member });
        },
        async addNotLikeToMember({ commit }, { memberId }) {
            //console.log('store - action:notLikeMember() - memberId: ', memberId)
            let updatedMemberId = await memberService.updateNotLikeMember(memberId);
            commit({ type: 'removeMemberIDontLike', updatedMemberId });
        },
        updateMemberOnlineStatus({ commit, dispatch }, { memberId, isOnline }) {
            console.log('updateMemberOnlineStatus', memberId, isOnline);
            commit({ type: 'updateMemberOnlineStatus', memberId, isOnline });
            dispatch({ type: 'updateMsgOnlineStatus', memberId, isOnline });
        },
        async getLikeFromMember({ commit, getters, dispatch }, { memberId }) {
            console.log('getLikeFromMember', memberId);
            let member = getters.memberById(memberId);
            console.log('getLikeFromMember', 'found member in store:', member);
            if (!member) {
                console.log('getLikeFromMember', 'getting member from server:', member);
                member = await memberService.getMemberById(memberId);
            }
            commit({ type: 'getLikeFromMember', memberId });
            console.log('store.member:getLikeFromMember (action) - commited')
            if (member.likes.iLike && member.likes.likeMe) dispatch({ type: 'addMatch', member });
            else {
                console.log('store.member:getLikeFromMember (action) - about to dispatch addNotif')
                dispatch({ type: 'addNotif', member, actionType: 'like' });
            }
            //EVENT_BUS.$emit(EV_RECEIVED_LIKE, member);
        },
    }
};