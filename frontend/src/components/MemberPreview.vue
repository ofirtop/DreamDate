<template>
  <section class="member-preview animated" @click="gotoMember" :class="{  fadeOutLeft: animate}">
    <div class="image-container" :style="{backgroundImage: `url(${member.mainImage})`}"/>
    <h2 class="member-name">
      <span v-if="member.online" class="online-status" title="Online" />
      {{member.name}}, {{memberAge}}
    </h2>
    <div class="member-prop">{{member.city}}, Israel</div>
    <div class="member-prop">{{familyDesc}}</div>

    <div class="actions-wrapper flex space-around">
      <div v-if="!isMatch" @click.stop="$emit('like', member)">
        <font-awesome-icon icon="heart" class="heart" />
      </div>
      <div v-if="isMatch" @click.stop="$emit('chat', member)" >
          <font-awesome-icon icon="comment" title="Start chat" class="chat"/>
      </div>
      <div v-if="!isMatch" @click.stop="$emit('notLike', member._id)">
        <font-awesome-icon icon="times" class="not-like" />
      </div>
    </div>
    <!-- <button @click.stop="animate = !animate">test</button> -->
  </section>
</template>

<script>
import { EVENT_BUS, EV_START_CHAT } from "@/event-bus.js";

export default {
  props: ["member"],
  data(){
    return {
      animate:false
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
    & > div{
      background: linear-gradient(to bottom right,  #2c8789, $clr1);
      color: #fff;
      width: 45px;
      height: 45px;
      font-size: 1.5rem;
      line-height: 60px;
      text-align: center;
      border-radius: 30px;
      box-shadow: 0 13px 26px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.2); 
      cursor: pointer;
    }
    & > .btn-chat {
      line-height: 50px;
    }
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

.online-status {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid white;
  background-color: $clr3;
}
</style>
