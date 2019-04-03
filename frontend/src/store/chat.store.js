import chatService from '@/services/chat.service.js';
import msgService from '@/services/msg.service.js';

export default {
    state: {
        chat: {
            isOpen: false,
            msgs: [],
            member: null,
            isMemberTyping: false
        }
    },
    mutations: {
        addChatMsg(state, { msg }) {
            state.chat.msgs.push(msg);
            state.chat.isMemberTyping = false;
        },
        addChatHistoryMsgs(state, { msgs }) {
            state.chat.msgs = msgs;
        },
        startChat(state, { member }) {
            state.chat.member = member;
            state.chat.isOpen = true;
        },
        setIsMemberTyping(state, { isTyping }) {
            state.chat.isMemberTyping = isTyping;
        },
        endChat(state) {
            state.chat.member = null;
            state.chat.msgs = [];
            state.chat.isOpen = false;
        },
    },
    getters: {
        chatMsgs(state) {
            return state.chat.msgs;
        },
        isMemberTyping(state) {
            return state.chat.isMemberTyping;
        }
    },
    actions: {
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
        async receiveChatMsg({ commit, dispatch }, { msg }) {
            commit({ type: 'addChatMsg', msg });
            EVENT_BUS.$emit(EV_CHAT_RECEIVED_MSG, msg);

            dispatch({ type: 'insertMsgFromChat', msg });

            // let msgWithUser = await msgService.getMsgById(msg._id);
            // commit({ type: 'removeMsgByMemberId', memberId: msgWithUser.fromUser._id });
            // commit({ type: 'insertMsg', msg: msgWithUser });

            // if (state.chat.isOpen && state.chat.member._id === msgWithUser.fromUser._id) {
            //     dispatch({ type: 'markMsgAsRead', msgId: msgWithUser._id });
            // }
        },
    }
};