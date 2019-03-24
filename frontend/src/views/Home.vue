<template>
  <section class="home-page">
    <member-match
      v-if="memberForMatch"
      :member="memberForMatch"
      @chat="startChat"
      @close="memberForMatch = null"
    />
    <main>
      <user-filter @setFilter="setFilter"></user-filter>
      <member-list @notLike="notLikeMember" @like="likeMember"></member-list>
    </main>
  </section>
</template>

<script>
import memberList from "@/components/MemberList.vue";
import userFilter from "@/components/UserFilter.vue";
import memberMatch from "@/components/MemberMatch.vue";
import { EVENT_BUS, EV_START_CHAT } from "@/event-bus.js";

export default {
  data() {
    return {
      memberForMatch: null,
      filterBy: {
           gender: '',
           minAge: null,
           maxAge: null,
           minHeight: null,
           city: ''
          },
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
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
      console.log('filterBy:', filterBy);
      
      this.$store.dispatch({ type: 'loadMembers', filterBy: this.filterBy})
    }
  },
  created() {
    this.$store.dispatch({ type: 'loadMembers', filterBy: this.filterBy})
  },
  components: {
    memberList,
    memberMatch,
    userFilter
  }
};
</script>

<style scoped>
main {
  max-width: 900px;
  margin: auto;
}
</style>
