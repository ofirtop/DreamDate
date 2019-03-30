<template>
  <section :class="classObj" class="notif" >
    <div class="content-wrapper flex space-between" @click="hide = true" :class="showHideClass">
      <div class="relative">
        <div class="photo" @click="doAction('view-details')" :class="showHideClass">
          <img :src="member.mainImage"/>
        </div>
      </div>
      <div class="content flex items-center">
              <h3 v-if="action === 'like' && isMatch">New match <br /><br />{{member.name}}</h3>
              <h3 v-if="action === 'like' && !isMatch">{{member.name}} <br /><br /> likes you!</h3>
              <h3 v-if="action === 'chat'">{{member.name}} <br /><br /> Wants to chat</h3>
      </div>
      <div class="chat" @click="doAction('chat')" v-if="isMatch">
        <div class="icon-container flex items-center">
          <font-awesome-icon icon="comment" size="4x" />
        </div>
          <span>Chat</span>

      </div>
    </div>
    <audio id="audio1">
      <source src="/assets/sounds/pop1.mp3" type="audio/mpeg">
    </audio>
  </section>
</template>

<script>

export default {
  name: 'incomingLikeNotification',
  props: ["member", 'action'],
  data() {
    return {
      hide: false,
      secondsToClose: 5 * 1000
    };
  },
  computed: {
    isMatch() {
      return this.member.likes.likeMe && this.member.likes.iLike;
    },
    showHideClass(){
      return {hide:this.hide, show:!this.hide};
    },
    classObj(){
      return {
        hide: this.hide,
        like: this.action === 'like',
        chat: this.action === 'chat'
      };
    }
  },
  methods:{
    doAction(action){
      setTimeout(()=>{
        switch(action){
          case 'chat':
            this.$emit('chat', this.member);
          break;
          case 'view-details':
            this.$emit('viewDetails', this.member);
          break;
        }
      },500);
    }
  },
  mounted(){
    document.querySelector('#audio1').play();
  },
  created(){
    setTimeout(() => this.hide = true, this.secondsToClose);//hide with animation before remove from dom
    setTimeout(() => this.$emit('close'), this.secondsToClose + 1000);
  }
};
</script>

<style scoped lang="scss">

@import '../sass/_variables.scss';

$height:100px;

.notif
 {
  position: fixed;
  top: 50px;
  right: 10px;
  z-index: 99;
}

.content-wrapper{
  position: relative;
  padding-right: 10px;
  width:300px;
  height: $height;
  box-shadow: 0 0 2rem #babbbc;
  background-color: white;
  &.show{
    animation: show-indicator 0.5s forwards ease-in-out;
  }
  &.hide{
    animation: hide-indicator 0.8s forwards ease-in-out;
  }
}
@keyframes show-indicator {
  0% {
    transform: translateX(200%);
  }
  100%{
    transform: translateX(3%);
  }
}
@keyframes hide-indicator {
  0% {
    transform: translateX(3%);
  }
  100%{
    transform: translateX(200%);
  }
}
  .photo{
    height: $height;
    width: $height;
    border-radius: 50%;
    border: 5px solid #fafafa;
    background-color: #fafafa;
    box-shadow: 0 0 0.5rem #babbbc;
    overflow: hidden;
    position: relative; 
    left: -50%; 
    cursor: pointer;
    img{
    width:100%;
    }
  }


.chat{
  cursor: pointer;
  padding-right:5px;
  animation: pop-btn1 0.3s both ease-in-out 0.5s;
  span{
    position: absolute;
    top: 39px;
    right: 20px;
    color: white;
  }
  .icon-container{
    height: 100%;
    width: 100%;
  }
}
.content{
  flex-grow: 1;
}
@keyframes hide-profile {
  100% {
    width: 0;
  }
}
@keyframes pop-btn1 {
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

/*from codepan*/
@keyframes show-profile {
  0% {
    width: 0;
  }
}

@keyframes rotate-photo {
  100% {
    transform: rotate(-360deg);
  }
}

</style>
