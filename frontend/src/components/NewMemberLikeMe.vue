<template>
    <section>
member {{member.from}} likes you! Start chat
    </section>
</template>

<script>
export default {
    props: ['member']
}
</script>

<style scoped>
section{
    background-color:lightgreen;
    position: fixed;
    top:0;
    right:0;
}
</style>
