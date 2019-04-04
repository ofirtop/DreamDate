<template>
  <section class="chat-cmp flex flex-column" v-if="chat">
    <div class="header flex space-between">
      <div>
        Chat with {{chat.memberName}}
      </div>
      <span class="typing" v-if="chat.isMemberTyping">typing...</span>
      <div @click="closeChat">
        <font-awesome-icon icon="times" title="close" />
      </div>
    </div>
    <ul class="flex flex-column">
      <li v-for="(msg, idx) in chat.msgs" :key="idx" class="msg" :class="getClass(msg)">{{msg.txt}}</li>
    </ul>

    <div class="input-wrapper flex ">
      <input autofocus @keyup.enter="sendMsg" v-model="txt" @keydown="typeMsg" placeholder="type your message...">
      <div @click="sendMsg" class="send">
        <font-awesome-icon icon="share" title="send"  />
      </div>
    </div>
  </section>
</template>

<script>
import chatService from "@/services/chat.service.js";

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
    }
  },
  methods: {
    sendMsg() {
      console.log('currMsg', this.currMsg);
      
      this.$store.dispatch({ type: "sendChatMsg", msg: this.currMsg });
      this.txt = '';
      this.iAmTyping = false;
    },
    getClass(msg) {
      let isOut = (msg.from === this.loggedInUser._id);
      return {
        in: !isOut,
        out: isOut
      };
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
  async created(){
  }
};
</script>

<style scoped lang="scss">
@import '../sass/_variables.scss';

.chat-cmp {
  position: fixed;
  bottom: 0;
  right: 0;
  height: 50vh;
  background: white;
  width: 40vw;
  max-width: 300px;
  border: 2px solid white;
  box-shadow: inset 0 0 9px 1px black;
  border-radius: 5px;
  .header{
        padding: 15px 15px 5px 15px;
        color: $clr2;
        .typing{
          color:#25ba25;
          font-size: 0.8em;
          align-self: flex-end;
        }
  }
}
ul {
  background-color: rgb(247, 244, 244);
  flex-grow: 1;
  margin: 5px;
  padding: 5px;
  overflow-y: auto;
  text-align: left;
}
.msg {
  background-color: white;
  padding: 2px 5px;
  margin-top:2px;
  max-width: 85%;
  &.in {
    color: $clr2;
    align-self: flex-start;
  }
  &.out {
    color: $clr1;
    background-color: white;
    align-self: flex-end;
  }
}
.input-wrapper{
  padding: 5px 10px 10px 10px;
  input{
    flex-grow:1;
    border-radius: 25px;
    border: 1px solid gray;
    padding:5px;
    outline: none;
  }
}
.send{
  padding:5px;
  cursor: pointer;
}
@media (max-width: 760px) {
  .chat-cmp{
    height: 77vh;
    width: 97vw;
    max-width: 100vw;
  }
}
</style>