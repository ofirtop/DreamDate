<template>
  <section v-if="memberCopy">
    member {{member.from}} likes you!
    <button @click="startChat">Start Chat</button>
  </section>
</template>

<script>
import { EVENT_BUS, EV_START_CHAT } from "@/event-bus.js";

export default {
  props: ["member"],
  data(){
    return {
      memberCopy:this.member
    };
  },
  methods: {
    startChat() {
      EVENT_BUS.$emit(EV_START_CHAT, this.member);
      this.memberCopy = null;//hides this notification
    }
  }
};
</script>

<style scoped>
section {
  background-color: lightgreen;
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 25px;
}
</style>
