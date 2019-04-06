<template>
    <li class="msg-prev-cmp flex animated" @click="$emit('openChat', msg)" 
    :class="{unread: !msg.isRead, active: isActive, pulse: isActive}">
        <div class="img-wrapper">
            <img :src="msg.fromUser.mainImage" alt="user image">
        </div>
        <div class="content-wrapper">
            <h3 class="flex space-between ">
                <span>
                    {{msg.fromUser.name}}
                    <span v-if="msg.fromUser.online" class="online-status" title="Online" />
                </span>
                <span class="msg-date">{{msg.timestamp | date}}</span>
            </h3>
            <div class="msg-txt">
                {{msg.txt | max-length(85)}}
            </div>
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
    padding: 10px;
    height: calc(#{$img-size} + 20px);
    width: calc(4 * #{$img-size});
    transition: 0.3s ease-out;
    background-color: $clr14;
    cursor: pointer;
    .online-status{
        border-color: $clr14;
    }
    &.unread{
        background-color: white;
        .online-status{
            border-color: white;
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
    // &.active{
    //     // &:after{
    //     //     background-color: $clr1;
    //     // }
    // }
    h3{
        margin-top: 0;
        .msg-date{
            font-size: 0.7em;
            font-weight: normal;
        }
    }
    .img-wrapper{
        flex-basis: $img-size;
        height: $img-size;
        object-fit: contain;
        margin-right: 15px;
        img{
            object-fit: cover;
            height: 99%;
            width: 100%;
        }
    }
    .content-wrapper{
        flex-basis: $img-size * 3;
    }
}

</style>