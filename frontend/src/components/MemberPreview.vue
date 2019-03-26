<template>
  <section class="member-preview">
    <router-link :to="'/member/'+member._id">
      <img :src="member.mainImage">
      <span class="online-status" :class="{on: this.member.online, off: !this.member.online}"/>
      <h2 class="member-name">{{member.name}},   {{memberAge}}</h2>
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
    showMatch() {
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
// @import url('https://fonts.googleapis.com/css?family=Abel');
@import url("https://fonts.googleapis.com/css?family=Lora");

.member-name {
  font-size: 1em;
  margin-top: 5px;
  font-family: "Lora", serif;
}
a {
  color: black;
}
.member-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  // background: #fff;
  background: rgba(248, 248, 248, 1);
  border-radius: 2px;
  margin: 1rem;
  position: relative;
  width: 250px;
  height: 270px;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

span {
  position: absolute;
  top: 10px;
  right: 10px;
  // border:2px solid black;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  // transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}
.member-preview:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.likes-panel {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 10px;
  color: white;
  align-items: center;
  height: 50px;
}

img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: 0 1px;
  box-shadow: 0 10px 4px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.font-awesome-icon {
  font-size: 2em;
  border: 1px solid;
}
.online-status {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  &.on {
    // background-color: green;
    background-color: #94e185;
    border-color: #78d965;
    box-shadow: 0px 0px 4px 1px #94e185;
  }
  &.off {
    background-color: #c9404d;
    border-color: #c42c3b;
    box-shadow: 0px 0px 4px 1px #c9404d;
  }
}
</style>
