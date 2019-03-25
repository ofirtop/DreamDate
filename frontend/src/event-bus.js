import Vue from 'vue';

export const EVENT_BUS = new Vue();

export const EV_RECEIVED_LIKE = 'received-like';
export const EV_START_CHAT = 'start-chat';
export const EV_CHAT_RECEIVED_MSG = 'chat-new-msg';
export const EV_NEW_MATCH = 'new-match';