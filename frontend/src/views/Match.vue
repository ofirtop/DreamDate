<template>
  <section v-if="loggedInUser" class="match-page">
    <main>
      <member-list/>
    </main>
  </section>
</template>

<script>
import memberList from "@/components/MemberList.vue";
import { EVENT_BUS, EV_NEW_MATCH } from "@/event-bus.js";

export default {
  data() {
    return {
      memberForMatch: null,
      filterBy: {
        gender: "",
        minAge: null,
        maxAge: null,
        minHeight: null,
        city: ""
      }
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
    }
  },
  created() {
    if (this.loggedInUser) {
      this.$store.dispatch({ type: "match" });
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
  padding: 20px 20px;
}
</style>