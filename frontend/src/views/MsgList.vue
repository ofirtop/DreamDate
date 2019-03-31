<template>
    <section class="msg-list-cmp">
        <ul>
            <msgPrev v-for="(msg, idx) in msgs" :key="idx" :msg="msg"/>
        </ul>
    </section>
</template>

<script>
import msgPrev from '@/components/MsgPreview.vue';

export default {
    name: 'msgList',
    computed:{
        msgs(){
            return this.$store.getters.msgs;
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


