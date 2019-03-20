<template>
  <section class="member-preview">
    <router-link :to="'/member/'+member._id">
      <h1>{{member.name}}, {{member.age}}</h1>
      <img :src= member.mainImage>
    </router-link>
    <div class="likes-panel">
      <font-awesome-icon icon="heart" @click.stop="like" />
      <font-awesome-icon icon="times" @click.stop="notLike"/>
    </div>
  </section>
</template>
<script>
export default {
  props: ['member'],
  methods: {
    like() {
      console.log('I like', this.member.name)
    },
    notLike() {
      console.log("I don't like", this.member.name)
    }
  }
};
</script>
<style scoped>
.member-preview {
  width: 200px;
  height: 300px;
  border: 1px solid grey;
  background-color: bisque;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
}
.likes-panel {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 10px;
  align-items: center;
  height: 50px;
}
img {
  width: 200px;
  height: 200px;
  object-fit: contain;
}
</style>
