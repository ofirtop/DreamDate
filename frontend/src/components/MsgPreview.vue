<template>
    <section class="msg-prev-cmp">
        <li class="flex space-between">
            <div class="img-wrapper">
                <img :src="msg.from.mainImage" alt="user image">
            </div>
            
            <div class="txt-wrapper">
                <h3>{{msg.from.name}}</h3>
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

.msg-prev-cmp{
    li{
        border: 1px solid $clr14;
        border-radius: 5px;
        height: 130px;
        width: 400px;
        margin-top: 20px;
        h3{
            color: $clr11;
            margin-bottom: 5px;
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
    }
}
</style>