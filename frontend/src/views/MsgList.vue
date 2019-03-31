<template>
    <section class="msg-list-cmp">
        <ul>
            <msgPrev v-for="(msg, idx) in msgs" :key="idx" :msg="msg" :isActive="activeMsg === msg._id" @openChat="openChat"/>
        </ul>
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
.msg-list-cmp{
    ul{
        margin-top: 100px;
    }
}
</style>


