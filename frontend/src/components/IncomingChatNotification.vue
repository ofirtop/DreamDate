<template>
    <section>
        {{member.name}} wants to chat with you
        <button @click="$emit('close')">&times;</button>  
        <br />
        <button @click="$emit('startChat', member)">Start chat</button>
        <!-- <router-link :to="'/member/'" + member._id>View Details</router-link> -->
    </section>
</template>

<script>
export default {
    name: 'IncomingChatNotification',
    props:['member']
}
</script>

<style scoped lang="scss">
section{
    position: fixed;
    top: 30%;
    left: 30%;
    background-color: lightgreen;
    border: 2px solid gray;
    border-radius: 5px;
    padding: 25px;
}
</style>


