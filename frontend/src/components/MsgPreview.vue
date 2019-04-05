<template>
    <li class="msg-prev-cmp flex" @click="$emit('openChat', msg)" :class="{unread: !msg.isRead, active: isActive}">
        <div class="img-wrapper">
            <img :src="msg.fromUser.mainImage" alt="user image">
        </div>
        <div class="content-wrapper">
            <h3 class="flex space-between ">
                <span>
                    <span v-if="msg.fromUser.online" class="online-status" title="Online" />
                    {{msg.fromUser.name}}
                </span>
                <span class="msg-date">{{msg.timestamp | date}}</span>
            </h3>
            <p>
                {{msg.txt}}
            </p>
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
    height: calc($img-size + 20px);
    width: calc(4 * #{$img-size});
    transition: 0.4s ease-out;
    background-color: $clr14;
    cursor: pointer;
    &.unread{
        // font-weight: bold;
        background-color: white;
        .msg-date{
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
        &:after{
            background-color: $clr1;
        }
    }
    h3{
        margin-top: 0;
        .msg-date{
            font-size: 0.7em;
        }
    }
    .img-wrapper{
        width: $img-size;
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
        flex-grow: 1;
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