<template>
  <section v-if="loggedInUser" class="match-page">
    <main>
      <member-list :members="members" @chat="startChat"/>
    </main>
  </section>
</template>

<script>
import memberList from "@/components/MemberList.vue";
import { EVENT_BUS, EV_NEW_MATCH, EV_START_CHAT } from "@/event-bus.js";

export default {
  data() {
    return {
      memberForMatch: null
    };
  },
  methods: {
    startChat(member) {
      //this.memberForMatch = null;
      //EVENT_BUS.$emit(EV_START_CHAT, member);
      this.$store.dispatch({type: 'startChat', memberId: member._id, memberName: member.name});
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    members() {
      return this.$store.getters.members;
    }
  },
  created() {
    if (this.loggedInUser) {
      this.$store.dispatch({type: 'removeAllMembers'});
      this.$store.dispatch({ type: "loadMembers", filterBy: null, routeName: 'match' });
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