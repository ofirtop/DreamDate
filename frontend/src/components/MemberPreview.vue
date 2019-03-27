<template>
  <section class="member-preview">
    <router-link :to="'/member/'+member._id">
      <img :src="member.mainImage">
      <span
        class="online-status"
        title="Online Status"
        :class="{on: this.member.online, off: !this.member.online}"
      />
    </router-link>
    <h2 class="member-name">{{member.name}}, {{memberAge}}</h2>
    <div class="like-panel" >
      <div class @click.stop="like" :title="likeStatus">
        <font-awesome-icon
          class="heart my-heart"
          icon="heart"
          :class="{on: this.member.likes.iLike, off: !this.member.likes.iLike}"
        />
        <font-awesome-icon
          class="heart member-heart"
          icon="heart"
          :class="{on: this.member.likes.likeMe, off: !this.member.likes.likeMe}"
        />
      </div>
      <!-- {{likeStatus}} -->
      <div class="chat" v-if="isMatch" @click="showMatch">Chat with me</div>
      <font-awesome-icon
        class="notLike"
        icon="times"
        @click.stop="notLike"
        title="Click to NOT like member"
      />
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
        if (this.member.likes.likeMe && this.member.likes.iLike) return "YA'! You Found a Match";
        if (!this.member.likes.likeMe && !this.member.likes.iLike) return "Click to like member";
        if (this.member.likes.likeMe) return "like me";
        if (this.member.likes.iLike) return `i like member`;
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

.my-heart {
  width: 20px;
  // border:2px solid green;
  &.on {
    color: red;
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
    color: #36648b;
  }
  &.off {
    color: gray;
  }
}

.notLike {
  color: black;
  cursor: pointer;
}
.member-name {
  font-size: 0.95em;
  margin-top: 5px;
  color: black;
}
a {
  color: black;
}
.chat {
  font-size: 14px;
  color: black;
  text-shadow: -1px 0 black, 0 1px yellow, 1px 0 yellow, 0 -1px yellow;
  // text-decoration: underline;
  cursor: pointer;
  margin-left:-20px;
  cursor:pointer;
}
.member-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: navajowhite;
  // background: rgba(248, 248, 248, 1);
  border-radius: 2px;
  margin: 1rem;
  position: relative;
  width: 250px;
  height: 265px;
  font-family: "Lora", serif;
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
  // box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  outline: 1px solid gold;
}

.like-panel {
  // border: 1px solid black;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 10px;
  color: white;
  align-items: center;
  height: 50px;
  padding-right: 35px;
  padding-left: 35px;
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
