<template>
    <li class="msg" :class="cssClass">
        <div class="msg-txt">
        {{msg.txt}}
        </div>
        <div class="timestamp">{{msg.timestamp | timeAndDay}}</div>
    </li>   
</template>

<script>
export default {
    name: 'chatMsg',
    props: ['msg', 'userId'],
    computed:{
        cssClass() { 
            let isSelf = (this.msg.from === this.userId);
            return {
                other: !isSelf,
                self: isSelf
            };
        },
    }
}
</script>

<style scoped lang="scss">
@import '@/sass/_variables.scss';

li {
    margin-top: 2px;
    max-width: 100%;
    border-radius: 3px;
    &.other {
        align-self: flex-start;
        .msg-txt{
            background-color: white;
        }
    }
    &.self {
        align-self: flex-end;   
        .msg-txt{
            background-color: $clr4;
            color: white;
        }      
  }
}
li:not(:last-child){
    margin-bottom: 20px;
}
.msg-txt{
    width:90%;
    padding: 5px;
    margin: 0;
    border-radius: 3px;
    font-size: 0.85rem;
}
.timestamp{
    font-size: 0.74rem;
    color: #747474;
    margin-top: 8px;
    padding-left: 3px;
}
</style>


