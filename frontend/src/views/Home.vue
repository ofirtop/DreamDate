<template>
  <section class="home-page">
    <main>
      <member-list @like="addLike"></member-list>
    </main>
  </section>
</template>

<script>
import memberList from "@/components/MemberList.vue";
import { EVENT_BUS, EV_NEW_MATCH } from "@/event-bus.js";

export default {
  methods: {
    async addLike(member) {
      await this.$store.dispatch({ type: "addLike", memberId: member._id });
      console.log('is match?',this.$store.getters.isMatch(member._id) );
      
      if (this.$store.getters.isMatch(member._id) ) {
        EVENT_BUS.$emit(EV_NEW_MATCH, member);
      }
    }
  },
  components: {
    memberList
  }
};
</script>

<style scoped>
main {
  max-width: 900px;
  margin: auto;
}
</style>