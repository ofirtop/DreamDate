<template>
    <section class="msg-prev-cmp">
        <li class="flex space-between items-center">
            <div class="img-wrapper">
                <img :src="msg.from.mainImage" alt="user image">
            </div>
            <div>{{msg.from.name}}</div>
            <div>
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
.msg-prev-cmp{
    li{
        border: 1px solid #ebebeb;
        border-radius: 4px;
        height: 100px;
        width: 300px;
        margin-top: 20px;
        padding: 5px;
    }
    .img-wrapper{
        width: 150px;
        height: 150px;
        img{
            width:100%;
        }
    }
}
</style>