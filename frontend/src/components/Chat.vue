<template>
  <section>
    <h1>Chat with {{member.name}}</h1>
    <button @click="closeChat">&times;</button>
  </section>
</template>

<script>
import { EVENT_BUS, EV_END_CHAT } from "@/event-bus.js";

export default {
  props: ["member"],
  methods: {
    closeChat() {
      EVENT_BUS.$emit(EV_END_CHAT);
    }
  }
};
</script>

<style scoped>
section {
    position: fixed;
    bottom: 0;
    right: 0;
    height: 50vh;
    background: yellow;
    width: 40vw;
    max-width:300px;
    border: 2px solid lightgoldenrodyellow;
    box-shadow: inset 0 0 9px 1px black;
    border-radius: 5px;
    padding:5px;
}
</style>