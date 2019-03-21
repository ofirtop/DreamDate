<template>
  <section class="home-page">
    <member-match
      v-if="memberForMatch"
      :member="memberForMatch"
      @chat="startChat"
      @close="memberForMatch = null"
    />
    <main>
      <member-list @like="likeMember"></member-list>
    </main>
  </section>
</template>

<script>
import memberList from "@/components/MemberList.vue";
import memberMatch from "@/components/MemberMatch.vue";
import { EVENT_BUS, EV_START_CHAT } from "@/event-bus.js";

export default {
  data() {
    return {
      memberForMatch: null
    };
  },
  methods: {
    likeMember(member) {
      this.memberForMatch = member;
    },
    startChat(member) {
      this.memberForMatch = null;
      EVENT_BUS.$emit(EV_START_CHAT, member);
    }
  },
  components: {
    memberList,
    memberMatch
  }
};
</script>

<style scoped>
main {
  max-width: 900px;
  margin: auto;
}
</style>
