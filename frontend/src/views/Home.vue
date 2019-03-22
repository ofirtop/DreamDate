<template>
  <section class="home-page">
    <member-match
      v-if="memberForMatch"
      :member="memberForMatch"
      @chat="startChat"
      @close="memberForMatch = null"
    />
    <main>
      <member-list @notLike="notLikeMember" @like="likeMember"></member-list>
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
      console.log("like member", member);
      this.memberForMatch = member;
    },
    notLikeMember(memberId) {
      this.$store.dispatch({ type: 'notLikeMember', memberId})
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
