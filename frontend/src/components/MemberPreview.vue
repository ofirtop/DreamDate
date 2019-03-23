<template>
  <section class="member-preview">
    <router-link :to="'/member/'+member._id">
      <h1 class="member-name">{{member.name}}, {{memberAge}}</h1>
      <img :src="member.mainImage">
    </router-link>
    <div class="likes-panel">
      <font-awesome-icon icon="heart" @click.stop="like" />
      {{likeStatus}}
      <font-awesome-icon icon="times" @click.stop="notLike"/>
  </div>
  </section>
</template>
<script>
export default {
  props: ['member'],
  methods: {
    like() {
      this.$emit('like', this.member);
    },
    notLike() {
      console.log("I don't like", this.member.name);
    }
  },
  computed: {
    memberAge() {
      let year = +(this.member.dateOfBirth.substring(6, 10));
      return new Date().getFullYear() - year;
    },
    likeStatus() {
      return this.$store.getters.likeStatus(this.member._id);
    }
  }
};
</script>
<style scoped lang="scss">
.member-name {
  font-size: 2em;
}
a {
  color: black;
}
.member-preview {
  width: 250px;
  height: 300px;
  border: 1px solid grey;
  background-color: rgb(196, 236, 255);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
}
.likes-panel {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 10px;
  align-items: center;
  height: 50px;
}

img {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
.font-awesome-icon {
  font-size: 2em;
}
</style>
