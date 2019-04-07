<template>
  <section class="member-preview" @click="gotoMember" 
          :class="{ animated: isLiked || isNotLiked, 'delay-0.8s':isLiked || isNotLiked,
           bounceOutRight:isLiked, bounceOutLeft:isNotLiked }">
    <div class="image-container" :style="{backgroundImage: `url(${member.mainImage})`}"/>
    <h2 class="member-name">
      <span v-if="member.online" class="online-status" title="Online" />
      {{member.name}}, {{memberAge}}
    </h2>
    <div class="member-prop">{{member.city}}, Israel</div>
    <div class="member-prop">{{familyDesc}}</div>

    <div class="actions-wrapper flex space-around">
      <div v-if="!isMatch" @click.stop="addLike" class="btn-round">
        <font-awesome-icon icon="heart" class="heart" />
      </div>
      <div v-if="isMatch" @click.stop="$emit('chat', member)" class="btn-round btn-chat">
          <font-awesome-icon icon="comment" title="Start chat" class="chat"/>
      </div>
      <div v-if="!isMatch" @click.stop="addNotLike" class="btn-round">
        <font-awesome-icon icon="times" class="not-like" />
      </div>
    </div>
  </section>
</template>

<script>
import { EVENT_BUS, EV_START_CHAT } from "@/event-bus.js";

export default {
  props: ["member"],
  data(){
    return {
      // animate: false,
      isLiked: false,
      isNotLiked: false
    };
  },
  computed: {
    memberAge() {
      let year = +this.member.dateOfBirth.substring(0, 4);
      return new Date().getFullYear() - year;
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
  },
  methods:{
    gotoMember(){
      this.$router.push('/member/'+ this.member._id);
    },
    addLike() {
      this.isLiked=true;
      setTimeout(() => {
        this.$emit('like',this.member);
      }, 1000);
    },
    addNotLike() {
      this.isNotLiked=true;
      setTimeout(() => {
        this.$emit('notLike',this.member._id);
      }, 1000);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../sass/_variables.scss";

.member-preview {
  border: 1px solid $clr15;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  .member-name {
    margin: 20px 0;
    font-weight: bold;
    font-size: 1.3rem;
  }
  .member-prop {
    margin-bottom: 8px;
  }  
  .actions-wrapper{
    margin: 20px 0;
  }
  .heart{
    transform: translateY(-5px);
  }
  .not-like{
    transform: translateY(-6px);
  }
  .chat{
    transform: translateY(-6px);
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
      padding-bottom: 90%;
    }
  }  
}


a {
  display: block;
  width: 100%;
}
</style>
