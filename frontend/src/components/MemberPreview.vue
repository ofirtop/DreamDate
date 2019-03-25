<template>
  <section class="member-preview">
    <router-link :to="'/member/'+member._id">
      <h1 class="member-name">
        <span class="online-status" :class="{on: this.member.online, off: !this.member.online}"/>
        {{member.name}}, {{memberAge}}
      </h1>
      <img :src="member.mainImage">
    </router-link>
    <div class="likes-panel">
      <font-awesome-icon icon="heart" @click.stop="like"/>
      {{likeStatus}}
      <button v-if="isMatch" @click="showMatch">Chat</button>
      <font-awesome-icon icon="times" @click.stop="notLike"/>
    </div>
  </section>
</template>

<script>
import { EVENT_BUS, EV_NEW_MATCH } from "@/event-bus.js";

export default {
  props: ["member"],
  methods: {
    like() {
      this.$emit("like", this.member);
    },
    notLike() {
      console.log("I don't like", this.member.name);
      this.$emit("notLike", this.member._id);
    },
    showMatch(){
        EVENT_BUS.$emit(EV_NEW_MATCH, this.member);
    }
  },
  computed: {
    memberAge() {
      let year = +this.member.dateOfBirth.substring(0, 4);
      return new Date().getFullYear() - year;
    },
    likeStatus() {
      //console.log('likes', this.member.likes, this.member._id);

      if (this.member.likes) {
        if (this.member.likes.likeMe && this.member.likes.iLike) return "match";
        if (this.member.likes.likeMe) return "like me";
        if (this.member.likes.iLike) return "i like";
      }
    },
    isMatch() {
      return this.member.likes.likeMe && this.member.likes.iLike;
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
.online-status {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  &.on {
    background-color: green;
  }
  &.off {
    background-color: red;
  }
}
</style>
