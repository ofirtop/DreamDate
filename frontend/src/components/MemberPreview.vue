<template>
  <section class="member-preview">
    <router-link :to="'/member/'+member._id" >
      <div class="imageContainer" :style="{backgroundImage: `url(${member.mainImage})`}"/>
      <div class="status-wrapper flex space-between items-center" >
        <span class="like-status" :title="likeStatus" >
          <font-awesome-icon class="heart my-heart" icon="heart" :class="{on: this.member.likes.iLike, off: !this.member.likes.iLike}" />
          <font-awesome-icon class="heart member-heart" icon="heart" :class="{on: this.member.likes.likeMe, off: !this.member.likes.likeMe}" />
        </span>
        <span class="online-status" title="Online" :class="{on: this.member.online, off: !this.member.online}" />
      </div>
    </router-link>
    <h2 class="member-name">{{member.name}}, {{memberAge}}</h2>
    <div class="like-panel">
      <div class @click.stop="like" title="Like">
        <font-awesome-icon icon="heart"  />
      </div>
      <div v-if="isMatch" @click="openChat()" class="btn-chat">
        <font-awesome-icon icon="comment" title="chat"  />
      </div>
      <div>
        <font-awesome-icon class="notLike" icon="times" @click.stop="notLike" title="Remove" />
      </div>
    </div>
  </section>
</template>

<script>
import { EVENT_BUS, EV_NEW_MATCH, EV_START_CHAT } from "@/event-bus.js";

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
    },
    openChat(){
      EVENT_BUS.$emit(EV_START_CHAT, this.member);
    }
  },
  computed: {
    memberAge() {
      let year = +this.member.dateOfBirth.substring(0, 4);
      return new Date().getFullYear() - year;
    },
    likeStatus() {
      if (this.member.likes) {
        if (this.member.likes.likeMe && this.member.likes.iLike)
          return "YA'! You Found a Match";
        if (!this.member.likes.likeMe && !this.member.likes.iLike)
          return "";
        if (this.member.likes.likeMe) return "likes you";
        if (this.member.likes.iLike) return `You like`;
      }
    },
    isMatch() {
      return this.member.likes.likeMe && this.member.likes.iLike;
    }
  }
};
</script>

<style scoped lang="scss">
  @import '../sass/_variables.scss';
.status-wrapper{
    width: 100%;
    position: absolute;
    top: 0px;
    height: 20px;
    padding: 16px 12px;
    opacity: 0.7;
}
a {
  display: block;
  width: 100%;
}
.imageContainer {
  height: 200px;
  background-size: cover;
  background-position: top;
  box-shadow: 0 10px 4px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.my-heart {
  width: 20px;
  // border:2px solid green;
  &.on {
    color: rgb(59, 193, 197);
  }
  &.off {
    color: gray;
  }
}
.member-heart {
  width: 20px;
  margin-left: -7px;
  // border:1px solid black;
  &.on {
    color: #8b368b;
  }
  &.off {
    color: gray;
  }
}
.member-name {
  font-size: 0.95em;
  margin-top: 5px;
  color: black;
}
a {
  color: black;
}
.member-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 2px;
  position: relative;
  height: 265px;
  font-family: "Lora", serif;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

// span {
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   // border:2px solid black;
//   box-shadow: 0 1px 5px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
//   // transition: all 0.3s cubic-bezier(.25,.8,.25,1);
// }
.member-preview:hover {
  // box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
}

.like-panel {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 10px;
  color: $clr10;
  align-items: center;
  height: 50px;
  padding-right: 35px;
  padding-left: 35px;
  > div{
    cursor: pointer;
  }
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
    background-color:$clr3;
    box-shadow: 0px 0px 2px 2px white;
  }
  &.off {
    background-color: $clr11;
    box-shadow: 0px 0px 2px 2px #6d6d6d;
  }
}
</style>
