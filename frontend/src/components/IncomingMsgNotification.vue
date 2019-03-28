<template>
  <section :class="{hide:!member}"  @click="hide = true">
    <div class="test flex space-between" @click="hide = true" :class="showHideClass">
      <div class="relative">
        <div class="photo1" @click="doAction('view-details')" :class="showHideClass">
          <img :src="member.mainImage"/>
        </div>
      </div>
      <div class="content1 flex items-center">
              <h3 v-if="action === 'like' && isMatch">New match <br /><br />{{member.name}}</h3>
              <h3 v-if="action === 'like' && !isMatch">{{member.name}} <br /><br /> likes you!</h3>
              <h3 v-if="action === 'chat'">{{member.name}} <br /><br /> Wants to chat</h3>
      </div>
      <div class="chat1" @click="doAction('chat')" v-if="isMatch">
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
    setTimeout(() => this.hide = true, this.secondsToClose - 500);//hide with animation before remove from dom
    setTimeout(() => this.$emit('close'), this.secondsToClose);
  }
};
</script>

<style scoped lang="scss">
  @import '../sass/_variables.scss';

$height:100px;
.test{
  position: relative;
  // margin-top:120px;
  padding-right: 10px;
  width:300px;
  height: $height;
  box-shadow: 0 0 2rem #babbbc;
  background-color: white;
  &.show{
    animation: show-indicator 0.5s forwards ease-in-out;
  }
  &.hide{
    animation: hide-indicator 0.5s forwards ease-in-out;
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
  .photo1{
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
    &.show{
      animation: rotate-photo1 0.5s forwards ease-in-out;
    }
    &.hide{
      animation: rotate-photo1-hide 0.5s backwards ease-in-out;
    }    
    img{
    width:100%;
    }
  }


.chat1{
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
.content1{
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

section {
  position: fixed;
  top: 50px;
  right: 10px;
  z-index: 99;
}
@keyframes rotate-photo1 {
  100% {
    transform: rotate(-360deg);
  }
}
@keyframes rotate-photo1-hide {
  100% {
    transform: rotate(360deg);
  }
}


/*from codepan*/
.profile {
  text-align: left;
  width: 330px;
  height: 100px;
  position: absolute;
  top: 0;
  right:0;
  // left: 50%;
  // transform: translate(-50%, -50%);
  border-radius: 5px;
  background-color: #fafafa;
  box-shadow: 0 0 2rem #babbbc;
  animation: show-profile 0.5s forwards ease-in-out;
}
@keyframes show-profile {
  0% {
    width: 0;
  }
}
.profile .photo, .profile .content {
  box-sizing: border-box;
}
.profile .photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid #fafafa;
  background-color: #fafafa;
  margin-left: -50px;
  box-shadow: 0 0 0.5rem #babbbc;
  animation: rotate-photo 0.5s forwards ease-in-out;
}
@keyframes rotate-photo {
  100% {
    transform: rotate(-360deg);
  }
}
.profile .photo img {
  width: 100%;
}
.profile .content {
  padding: 10px;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.profile .content::before {
  content: "";
  position: absolute;
  width: 230px;
  height: 150px;
  background-color: $clr1;
  left: 0;
  top: -20px;
  z-index: -1;
  transform: rotate(-8deg);
}
.profile .content .text {
  margin-top: 20px;
  margin-left: 50px;
}
.profile .content .text h3, .profile .content .text h6 {
  font-weight: normal;
  margin: 3px 0;
  letter-spacing: 0.5px;
  white-space: nowrap;
}
.profile .content .btn {
  width: 50px;
  height: 50px;
  position: absolute;
  right: 25px;
  top: 25px;
  border-radius: 50%;
  z-index: 1;
  cursor: pointer;
  transition-duration: 0.3s;
  animation: pop-btn 0.3s both ease-in-out 0.5s;
  div{
    position: absolute;
    top: 20px;
    left: 14px;
    color: white;
  }
}
@keyframes pop-btn {
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
// .profile .content .btn:hover {
//   box-shadow: 0 0 0 5px rgba(170, 187, 204, 0.5);
// }
.profile .content .btn span {
  width: 60%;
  height: 2px;
  position: absolute;
  background-color: white;
  top: 50%;
  left: 20%;
  transform: translateY(-50%);
  animation: to-hamburger 0.3s forwards ease-in-out;
}
.profile .content .btn span::before, .profile .content .btn span::after {
  content: "";
  width: 100%;
  height: 2px;
  position: absolute;
  background-color: white;
  transition-duration: 0.3s;
  transform: rotate(0deg);
  right: 0;
}
.profile .content .btn span::before {
  margin-top: -7px;
}
.profile .content .btn span::after {
  margin-top: 7px;
}
.profile .content .btn.active span {
  animation: to-arrow 0.3s forwards ease-in-out;
}
.profile .content .btn.active span::before, .profile .content .btn.active span::after {
  width: 60%;
  right: -1px;
}
.profile .content .btn.active span::before {
  transform: rotate(45deg);
}
.profile .content .btn.active span::after {
  transform: rotate(-45deg);
}
@keyframes to-hamburger {
  from {
    transform: translateY(-50%) rotate(-180deg);
  }
}
@keyframes to-arrow {
  from {
    transform: translateY(-50%) rotate(0deg);
  }
  to {
    transform: translateY(-50%) rotate(180deg);
  }
}
.profile .box {
  width: 150px;
  height: 150px;
  opacity: 0;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  position: absolute;
  top: 50%;
  right: -40%;
  transform: translate(-50%, -50%);
  transition-duration: 0.3s;
}
.profile .box i {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ececec;
  font-size: 26px;
  text-align: center;
  line-height: 50px;
  position: absolute;
  left: 18px;
  top: calc(75px - 50px/2);
  box-shadow: 0 0 0.5rem #babbbc;
  transition-duration: 0.3s;
}
.profile .box i:hover {
  transition-delay: initial !important;
  box-shadow: 0 0 0 5px #babbbc;
}
.profile .box.open {
  opacity: 1;
}
.profile .box.open i {
  left: 60px;
}
.profile .box.open i:nth-of-type(1) {
  transform: rotate(-90deg) translateX(120px) rotate(90deg);
  transition-delay: 0s;
}
.profile .box.open i:nth-of-type(2) {
  transform: rotate(-45deg) translateX(120px) rotate(45deg);
  transition-delay: 0.1s;
}
.profile .box.open i:nth-of-type(3) {
  transform: rotate(0deg) translateX(120px) rotate(0deg);
  transition-delay: 0.2s;
}
.profile .box.open i:nth-of-type(4) {
  transform: rotate(45deg) translateX(120px) rotate(-45deg);
  transition-delay: 0.3s;
}
.profile .box.open i:nth-of-type(5) {
  transform: rotate(90deg) translateX(120px) rotate(-90deg);
  transition-delay: 0.4s;
}
</style>
