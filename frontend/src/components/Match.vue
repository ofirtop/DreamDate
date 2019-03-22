<template>
  <section>
    <h1>Match with {{member.name}}</h1>
    <button @click="startChat">Start Chat</button>
    <button @click="$emit('close')">Later...</button>
  </section>
</template>

<script>
import { EVENT_BUS, EV_START_CHAT } from "@/event-bus.js";

export default {
  props: ["member"],
  methods: {
    startChat() {
      EVENT_BUS.$emit(EV_START_CHAT, this.member);
      this.$emit('close');
    }
  }
};
</script>

<style scoped lang="scss">
section {
  background-color: red;
  width: 200px;
  border: 2px solid lightcoral;
  padding: 5px;
  position: fixed;
  top: 30%;
  left: 50%;
  height: 300px;
  box-shadow: 2px 2px 20px 14px black;
}

button {
  display: inline-block;
  margin-right: 10px;
}
</style>
