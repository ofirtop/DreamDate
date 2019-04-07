<template>
  <section class="chat-cmp flex flex-column" v-if="chat">
    <header class="top-bar">
      <h3 class="header flex space-between">
        <font-awesome-icon icon="comment"/>        
        <div>
          Chat with {{chat.memberName}}
          <span class="typing" v-if="chat.isMemberTyping">typing...</span>
        </div>
        <div @click="closeChat" class="clickable">
          <font-awesome-icon icon="times" title="close" />
        </div>
      </h3>
    </header>
    <ul class="flex flex-column">
      <chatMsg v-for="(msg, idx) in chat.msgs" :key="idx" :msg="msg" :userId="loggedInUser._id" />
    </ul>

    <div class="input-wrapper">
      <input autofocus @keyup.enter="sendMsg" v-model="txt" @keydown="typeMsg" placeholder="type your message...">
      <!-- <div @click="sendMsg" class="send">
        <font-awesome-icon icon="share" title="send"  />
      </div> -->
    </div>
  </section>
</template>

<script>
import chatService from "@/services/chat.service.js";
import chatMsg from '@/components/ChatMsg.vue';

export default {
  data() {
    return {
      txt: '',
      iAmTyping: false
    };
  },
  computed: {
    chat(){
      return this.$store.getters.chat;
    },
    loggedInUser(){
      return this.$store.getters.loggedInUser;
    },
    currMsg(){
      return {to: this.chat.memberId, from: this.loggedInUser._id, txt: this.txt};
    }
  },
  watch: {
    txt(){
        if (this.txt === "" && this.iAmTyping) {
          this.$store.dispatch({ type: "finishTyping", msg: this.currMsg });
          this.iAmTyping = false;
        }
    },
    chat(){
      this.txt = '';
      this.iAmTyping = false;
    }
  },
  methods: {
    sendMsg() {
      console.log('currMsg', this.currMsg);
      
      this.$store.dispatch({ type: "sendChatMsg", msg: this.currMsg });
      this.txt = '';
      this.iAmTyping = false;
    },
    typeMsg() {
      if (!this.iAmTyping) {
        this.$store.dispatch({ type: "startTyping", msg: this.currMsg });
        this.iAmTyping = true;
      }
    },
    closeChat() {
      this.$store.dispatch({ type: "endChat" });
    }
  },
  components:{
    chatMsg    
  }
};
</script>

<style scoped lang="scss">
@import '../sass/_variables.scss';

.chat-cmp {
  position: fixed;
  bottom: 0;
  left: 50%;
  height: 70vh;
  /* background-color: #030303; */
  width: 30vw;
  /* max-width: 300px; */
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.top-bar {
  background: #666;
  position: relative;
  // overflow: hidden; 
  // height: 160px;
}
// .top-bar::before {
//   content: "";
//   position: absolute;
//   top: -100%;
//   left: 0;
//   right: 0;
//   bottom: -100%;
//   opacity: 0.25;
//   background: radial-gradient(white, black);
// }
.top-bar > * {
  position: relative;
}
// .top-bar::before {
//   animation: pulse 1s ease alternate ;
// }
@keyframes pulse {
  from { opacity: 0; }
  to { opacity: 0.5; }
}
h3{
  color: white;
  padding: 5px;
  margin: 3px;
  .typing{
    color:#25ba25;
    font-size: 0.8em;
    align-self: flex-end;
  }
}
ul {
  background-color: #e5e5e5;
  flex-grow: 1;
  padding: 5px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.input-wrapper{
  input{
    //flex-grow: 1;
    border: 1px solid #e5e5e5;
    padding: 5px;
    outline: none;
    height: 100%;
    width: 100%;
    font-size: 0.85rem;
  }
}
.send{
  padding:5px;
  color: white;
  cursor: pointer;
}

@media (max-width: 760px) {
  .chat-cmp{
    height: 77vh;
    width: 97vw;
    left: 0;
    top: 10vh;
  }
}
</style>