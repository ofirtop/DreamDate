<template>
    <section class="msg-list-cmp flex space-between align-start">
        <ul>
            <msgPrev v-for="(msg, idx) in msgs" :key="idx" :msg="msg" :isActive="activeMsg === msg._id" @openChat="openChat"/>
        </ul>
        <div class="chat-wrapper flex content-center items-center">
            <h1>chat here</h1>
        </div>
    </section>
</template>

<script>
import msgPrev from '@/components/MsgPreview.vue';
import {EV_START_CHAT, EVENT_BUS} from '@/event-bus.js';

export default {
    name: 'msgList',
    data(){
        return {
            activeMsg:-1
        };
    },
    computed:{
        msgs(){
            return this.$store.getters.msgs;
        }
    },
    methods:{
        async openChat(msg){
            this.activeMsg = msg._id;
            this.$store.dispatch({type: 'markMsgAsRead', msgId:msg._id});//DO NOT WAIT FOR PROMISE!

            let member = await this.$store.dispatch({type: 'loadMemberById', memberId: msg.fromUser._id});
            EVENT_BUS.$emit(EV_START_CHAT, member);
        }
    },
    components:{
        msgPrev
    }
}
</script>

<style scoped lang="scss">
@import '@/sass/_variables.scss';

.msg-list-cmp{
    width: 100%;
    max-width: 1200px;
    margin: auto;    
    margin-top: 100px;
}
.chat-wrapper{
    flex-grow: 1;
    border: 1px solid $clr14;
    margin-left: 20px;
    height: 85vh;
    border-radius: 5px;
}
</style>


