<template>
  <section class="member-preview">
    <router-link :to="'/member/'+member._id">
      <div class="imageContainer" :style="{backgroundImage: `url(${member.mainImage})`}"/>
      <div v-if="this.member.online" class="status-wrapper flex space-between items-center">
        <span
          class="online-status"
          title="Online"
          :class="{on: this.member.online, off: !this.member.online}"
        />
      </div>
    </router-link>
    <h2 class="member-name">{{member.name}}, {{memberAge}}</h2>
    <div class="actions-wrapper">
      <span class="like-status" :title="likeStatus" @click.stop="$emit('like', member)">
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
      </span>
      <!-- <div class @click.stop="$emit('like', member)" title="Like">
        <font-awesome-icon icon="heart"/>
      </div>-->
      <div v-if="isMatch" @click="$emit('chat', member)" class="btn-chat">
        <font-awesome-icon icon="comment" title="Click to start chat"/>
      </div>
      <div>
        <font-awesome-icon
          class="notLike"
          icon="times"
          @click.stop="$emit('notLike', member._id)"
          title="Click to remove member"
        />
      </div>
    </div>
    <div class="member-prop">{{member.city}}, Israel</div>
    <div class="member-prop">{{familyDesc}}</div>
  </section>
</template>

<script>
import { EVENT_BUS, EV_START_CHAT } from "@/event-bus.js";

export default {
  props: ["member"],
  computed: {
    memberAge() {
      let year = +this.member.dateOfBirth.substring(0, 4);
      return new Date().getFullYear() - year;
    },
    likeStatus() {
      if (this.member.likes) {
        if (this.member.likes.likeMe && this.member.likes.iLike)
          return "YA'! You Found a Match";
        if (!this.member.likes.likeMe && !this.member.likes.iLike) return "";
        if (this.member.likes.likeMe) return "likes you";
        if (this.member.likes.iLike) return `You like`;
      }
    },
    familyDesc() {
      let children =
        parseInt(this.member.numOfChildren) === 0
          ? "No Children"
          : ` (+${this.member.numOfChildren})`;
      return `${this.member.maritalStatus}, ${children}   `;
    },
    isMatch() {
      return this.member.likes.likeMe && this.member.likes.iLike;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../sass/_variables.scss";
.btn-chat{
  color:#8b368b
}
.notLike {
  color: lightgray;
}
.status-wrapper {
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
}

.my-heart {
  width: 20px;
  &.on {
    color: rgb(59, 193, 197);
  }
  &.off {
    color: lightgray;
  }
}
.member-heart {
  width: 20px;
  margin-left: -7px;
  &.on {
    color: #8b368b;
  }
  &.off {
    color: lightgray;
  }
}
.member-name {
  font-size: 0.95em;
  color: black;
  margin-top: 0.3rem;
  margin-bottom: 0rem;
}
.member-prop {
  width: 90%;
  font-size: 0.7em;
  margin-top: 0.3rem;

  color: black;
  text-align: left;
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
  height: 300px;
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
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  // box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
}

.actions-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  // margin-top: -20px;
  color: $clr10;
  align-items: center;
  height: 25px;
  padding: 0 15px;
  > div {
    cursor: pointer;
    padding: 5px;
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
    background-color: $clr3;
    box-shadow: 0px 0px 2px 2px white;
  }
  &.off {
    background-color: $clr11;
    box-shadow: 0px 0px 2px 2px #6d6d6d;
  }
}
</style>
