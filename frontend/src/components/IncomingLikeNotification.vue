<template>
  <section v-if="memberCopy">
    <div v-if="!isMatch">{{member.name}} likes you!</div>
    <div v-if="isMatch">You have a match with {{member.name}}</div>
    <button @click="$emit('viewDetails', member)">View Details</button>
    <button v-if="isMatch" @click="$emit('chat', member)">Start Chat</button>
    <br>
    {{member.likes}}
  </section>
</template>

<script>

export default {
  props: ["member"],
  data() {
    return {
      memberCopy: this.member
    };
  },
  computed: {
    isMatch() {
      return this.member.likes.likeMe && this.member.likes.iLike;
    }
  }
};
</script>

<style scoped>
section {
  background-color: lightgreen;
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 25px;
  z-index: 99;
}
</style>
