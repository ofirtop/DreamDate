import chatService from '@/services/chat.service.js';

export default {
    state: {
        // chat:{
        //     memberId: -1,
        //     memberName,
        //     msgs: [],
        //     isMemberTyping: false,
        //     isClosing: false
        // }
        chat: null
    },
    getters: {
        chat(state) {
            return state.chat;
        }
    },
    mutations: {
        addChatMsg(state, { msg }) {
            state.chat.msgs.push(msg);
            state.chat.isMemberTyping = false;
        },
        loadHistoryMsgs(state, { msgs }) {
            state.chat.msgs = msgs;
        },
        startChat(state, { memberId, memberName }) {
            state.chat = {
                memberId,
                memberName,
                msgs: [],
                isMemberTyping: false,
                isClosing: false
            };
        },
        // hideChat(state) {
        //     state.chat.isClosing = true;
        // },
        endChat(state) {
            state.chat = null;
        },
        toggleIsMemberTyping(state, { isMemberTyping }) {
            //console.log('toggleIsMemberTyping', isMemberTyping);
            state.chat.isMemberTyping = isMemberTyping;
        },
    },
    actions: {
        startChat({ commit, dispatch }, { memberId, memberName }) {
            //console.log('memberId', memberId, 'memberName', memberName);

            commit({ type: 'startChat', memberId, memberName });
            dispatch({ type: 'loadHistoryMsgs', memberId });
        },
        endChat({ commit }) {
            //commit({ type: 'hideChat' });
            //setTimeout(() => { commit({ type: 'endChat' }) });
            commit({ type: 'endChat' });
        },
        async loadHistoryMsgs({ commit }, { memberId }) {
            let msgs = await chatService.getHistoryMsgs(memberId);
            commit({ type: 'loadHistoryMsgs', msgs });
        },
        sendChatMsg({ commit }, { msg }) {
            chatService.sendMsg(msg);
            commit({ type: 'addChatMsg', msg });
        },
        startTyping({ }, { msg }) {
            chatService.startTyping(msg);
        },
        finishTyping({ }, { msg }) {
            chatService.finishTyping(msg);
        },
        receiveMemberStartTyping({ commit, state }, { msg }) {
            //console.log('store', 'receiveMemberStartTyping', msg.from);

            if (state.chat && state.chat.memberId === msg.from) {
                commit({ type: 'toggleIsMemberTyping', isMemberTyping: true });
            }
        },
        receiveMemberStopTyping({ commit, state }, { msg }) {
            //console.log('store', 'receiveMemberStopTyping', msg.from);
            if (state.chat && state.chat.memberId === msg.from) {
                commit({ type: 'toggleIsMemberTyping', isMemberTyping: false });
            }
        },
        async receiveChatMsg({ commit, state, dispatch }, { msg }) {
            console.log('receiveChatMsg', msg);

            if (state.chat && state.chat.memberId === msg.from) {//member is in active chat
                commit({ type: 'addChatMsg', msg });
            }
            //EVENT_BUS.$emit(EV_CHAT_RECEIVED_MSG, msg);

            dispatch({ type: 'receiveMsg', msg });

            // let msgWithUser = await msgService.getMsgById(msg._id);
            // commit({ type: 'removeMsgByMemberId', memberId: msgWithUser.fromUser._id });
            // commit({ type: 'insertMsg', msg: msgWithUser });

            // if (state.chat.isOpen && state.chat.member._id === msgWithUser.fromUser._id) {
            //     dispatch({ type: 'markMsgAsRead', msgId: msgWithUser._id });
            // }
        },
    }
};