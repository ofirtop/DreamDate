<template>
        <li class="msg-prev-cmp flex space-between" @click="$emit('openChat', msg)" :class="{unread: !msg.isRead}">
            <div class="img-wrapper">
                <img :src="msg.fromUser.mainImage" alt="user image">
            </div>
            
            <div class="txt-wrapper">
                <h3 class="flex space-between items-center">
                    <span>{{msg.fromUser.name}}</span>
                    <span class="time">{{msg.timestamp | date}}</span>
                </h3>
                {{msg.txt}}
            </div>
        </li>
    </section>
</template>

<script>
export default {
    name: 'msgPrev',
    props:['msg']
}
</script>

<style scoped lang="scss">
@import '@/sass/_variables.scss';

li.msg-prev-cmp{
    border: 1px solid $clr14;
    border-radius: 5px;
    height: 130px;
    width: 400px;
    margin-top: 20px;
    &.unread{
        background-color: $clr14;
    }
    h3{
        color: $clr11;
        margin-bottom: 5px;
        .time{
            font-size: 0.7em;
        }
    }
    .img-wrapper{
        width: 130px;
        height: 130px;
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
        padding: 5px 8px;
        flex-grow: 1;
    }
}
</style>