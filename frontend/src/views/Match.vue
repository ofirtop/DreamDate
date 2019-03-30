<template>
  <section v-if="loggedInUser" class="match-page">
    <main>
      <member-list :members="matches"/>
    </main>
  </section>
</template>

<script>
import memberList from "@/components/MemberList.vue";
import { EVENT_BUS, EV_NEW_MATCH } from "@/event-bus.js";

export default {
  data() {
    return {
      memberForMatch: null
    };
  },
  methods: {
    startChat(member) {
      this.memberForMatch = null;
      EVENT_BUS.$emit(EV_START_CHAT, member);
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    matches() {
      return this.$store.getters.matches;
    }
  },
  created() {
    if (this.loggedInUser) {
      this.$store.dispatch({ type: "loadMatches" });
    }
  },
  // watched: {
  //   loggedInUser() {
  //     if (this.loggedInUser)
  //       this.$store.dispatch({ type: "loadMembers", filterBy: this.filterBy });
  //   }
  //},
  components: {
    memberList
    //memberFilter
  }
};
</script>

<style scoped>
main {
  width: 100%;
  padding: 0 10px;
  max-width: 1200px;
  width: 100%;
  margin-top:-50px;
}
.match-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>