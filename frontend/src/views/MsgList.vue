<template>
    <section class="msg-list-cmp flex space-between align-start">
        <ul>
            <msgPrev v-for="(msg, idx) in msgs" :key="idx" :msg="msg" :isActive="activeMsgID === msg._id" @openChat="openChat"/>
        </ul>
        <!-- <div class="chat-wrapper flex content-center align-center">
            <chat chatLocation="msgList"/>
        </div> -->
    </section>
</template>

<script>
import msgPrev from '@/components/MsgPreview.vue';
import chat from '@/components/Chat.vue';

export default {
    name: 'msgList',
    data(){
        return {
            activeMsgID:-1
        };
    },
    computed:{
        msgs(){
            return this.$store.getters.msgs;
        }
    },
    methods:{
        async openChat(msg){
            console.log('msg', msg);
            
            this.$store.dispatch({type: 'startChat', memberId: msg.fromUser._id, memberName: msg.fromUser.name });

            this.activeMsgID = msg._id;
            this.$store.dispatch({type: 'markMsgAsRead', msgId:msg._id});//DO NOT WAIT FOR PROMISE!

        }
    },
    components:{
        msgPrev,
        chat
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


