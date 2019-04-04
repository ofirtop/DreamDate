import msgService from '@/services/msg.service.js';

export default {
    state: {
        msgs: [],
    },
    getters: {
        msgs(state) {
            return state.msgs;
        },
        unreadMsgCount(state) {
            return state.msgs.filter(msg => !msg.isRead).length;
        }
    },
    mutations: {
        addMsgs(state, { msgs }) {
            state.msgs = msgs;
        },
        insertMsg(state, { msg }) {
            state.msgs.unshift(msg);
        },
        removeMsgByMemberId(state, { memberId }) {
            let idx = state.msgs.findIndex(msg => msg.fromUser._id === memberId);
            if (idx > -1) state.msgs.splice(idx, 1);
        },
        markMsgAsRead(state, { msgId }) {
            let msg = state.msgs.find(currMsg => currMsg._id === msgId);
            msg.isRead = true;
        }
    },
    actions: {
        async getMsgHistory({ commit }, { memberId }) {
            let msgs = await msgService.getMsgHistory(memberId);
            commit({ type: 'addChatHistoryMsgs', msgs });
        },
        async getTopMsgs({ commit, rootState }) {
            let msgs = await msgService.getTopMsgs(rootState.userStore.loggedInUser._id);
            commit({ type: 'addMsgs', msgs });
        },
        async markMsgAsRead({ commit }, { msgId }) {
            await msgService.markMsgAsRead(msgId);
            commit({ type: 'markMsgAsRead', msgId });
        },
        removeMsgByMemberId({ commit }, { memberId }) {
            commit({ type: 'removeMsgByMemberId', memberId });
        },
        async receiveMsg({ commit, rootState, dispatch }, { msg }) {

            let msgWithUser = await msgService.getMsgById(msg._id);
            console.log('msgWithUser', msgWithUser);

            commit({ type: 'removeMsgByMemberId', memberId: msgWithUser.fromUser._id });
            commit({ type: 'insertMsg', msg: msgWithUser });

            if (rootState.chatStore.chat && rootState.chatStore.chat.memberId === msgWithUser.fromUser._id) {
                dispatch({ type: 'markMsgAsRead', msgId: msgWithUser._id });
            }
        },
        updateMsgOnlineStatus({ commit }, { memberId }) {

        }
    }
};