<template>
  <section class="home-page">
    <main>
      <member-list @notLike="notLikeMember" @like="addLike"></member-list>
    </main>
  </section>
</template>

<script>
import memberList from "@/components/MemberList.vue";
import { EVENT_BUS, EV_NEW_MATCH } from "@/event-bus.js";

export default {
  methods: {
    async addLike(member) {
      await this.$store.dispatch({ type: "addLikeToMember", member });

      if (member.likes.iLike && member.likes.likeMe) {
        EVENT_BUS.$emit(EV_NEW_MATCH, member);
      }
    },
    notLikeMember(memberId) {
      this.$store.dispatch({ type: "notLikeMember", memberId });
    },
    startChat(member) {
      this.memberForMatch = null;
      EVENT_BUS.$emit(EV_START_CHAT, member);
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