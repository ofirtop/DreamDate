<template>
  <section class="member-preview ">
    <router-link :to="'/member/'+member._id">
      <div class="image-container" :style="{backgroundImage: `url(${member.mainImage})`}"/>
      <div v-if="this.member.online" class="status-wrapper flex space-between items-center">
        <span
          class="online-status"
          title="Online"
          :class="{on: this.member.online, off: !this.member.online}"
        />
      </div>
    </router-link>
    <h2 class="member-name">{{member.name}}, {{memberAge}}</h2>
    <div class="member-prop">{{member.city}}, Israel</div>
    <div class="member-prop">{{familyDesc}}</div>

    <div class="actions-wrapper1 flex space-around">
      <div @click.stop="$emit('like', member)">
        <font-awesome-icon icon="heart" class="heart" />
      </div>
      <div @click.stop="$emit('notLike', member._id)">
        <font-awesome-icon icon="times" />
      </div>
    </div>
    <div class="actions-wrapper" v-if="false" >
      <span class="like-status" :title="likeStatus" >
        <font-awesome-icon class="heart my-heart" icon="heart" :class="{on: this.member.likes.iLike, off: !this.member.likes.iLike}" />
        <font-awesome-icon class="heart member-heart" icon="heart" :class="{on: this.member.likes.likeMe, off: !this.member.likes.likeMe}" />
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
          title="Click to remove"
        />
      </div>
    </div>

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
        if (!this.member.likes.likeMe && !this.member.likes.iLike)
          return `Click to like ${this.member.name}`;
        if (this.member.likes.likeMe) return `${this.member.name} likes you`;
        if (this.member.likes.iLike) return `You like  ${this.member.name}`;
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

.member-preview {
  border: 1px solid $clr15;
  border-radius: 5px;
  .member-name {
    margin: 20px 0;
    font-weight: bold;
    font-size: 1.3rem;
  }
  .member-prop {
    margin-bottom: 8px;
  }  
  .actions-wrapper1{
    margin: 30px 0;
    & > div{
      background: linear-gradient(to bottom right, #6452E9, #639FF9);
      color: #fff;
      width: 60px;
      height: 60px;
      font-size: 28px;
      line-height: 60px;
      text-align: center;
      border-radius: 30px;
      box-shadow: 0 13px 26px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.2); 
      cursor: pointer;
    }
  }
  .heart{
    transform: translateY(2px);
  }
  .image-container {
    // height: 200px;
    background-size: cover;
    background-position: center;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    &:after{
      content:"";
      display:block;
      padding-bottom: 100%;
    }
  }  
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

.online-status {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;

  border: 2px solid white;
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
