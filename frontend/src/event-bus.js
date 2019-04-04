import Vue from 'vue';

export const EVENT_BUS = new Vue();

// export const EV_RECEIVED_LIKE = 'ev-received-like';
export const EV_START_CHAT = 'ev-start-chat';
export const EV_CHAT_RECEIVED_MSG = 'ev-chat-new-msg';