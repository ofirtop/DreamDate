<template>
    <li class="msg-prev-cmp flex space-between" @click="$emit('openChat', msg)" :class="{unread: !msg.isRead, active: isActive}">
        <div class="img-wrapper">
            <img :src="msg.fromUser.mainImage" alt="user image">
        </div>
        
        <div class="txt-wrapper flex flex-column space-around">
            <h3 class="flex space-between items-center">
                <span>
                    <span v-if="msg.fromUser.online" class="online-status" title="Online" />
                    {{msg.fromUser.name}}
                </span>
                <span class="time">{{msg.timestamp | date}}</span>
            </h3>
            {{msg.txt}}
        </div>
    </li>
</template>

<script>
export default {
    name: 'msgPrev',
    props:['msg', 'isActive']
}
</script>

<style scoped lang="scss">
@import '@/sass/_variables.scss';

$img-size: 100px;

.msg-prev-cmp{
    border: 1px solid $clr14;
    border-radius: 5px;
    height: $img-size;
    width: calc(4 * #{$img-size});
    transition: 0.4s ease-out;
    background-color: $clr14;
    cursor: pointer;
    &:not(:last-child){
        margin-bottom: 20px;
    }
    &.unread{
        font-weight: bold;
        background-color: white;
        .time{
            font-weight: normal;
        }
        &:after{
            background-color: white;
        }        
    }
    &:after{
        content: '';
        width: 5px;
        background-color: $clr14;
        transition: 0.5s ease;
    }    
    &.active{
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
        &:after{
            background-color: $clr1;
        }
    }
    h3{
        margin-bottom: 5px;
        .time{
            font-size: 0.7em;
        }
    }
    .img-wrapper{
        width: $img-size;
        height: $img-size;
        object-fit: contain;
        img{
            object-fit: cover;
            height: 99%;
            width: 100%;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
        }
    }
    .txt-wrapper{
        text-align: left;
        padding: 5px 15px;
        flex-grow: 1;
    }
}
.online-status {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid white;
  background-color: $clr3;
}
</style>