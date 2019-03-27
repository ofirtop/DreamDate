<template>
  <section v-if="loggedInUser" class="home-page">
    <member-filter @setFilter="setFilter"/>
    <!-- <main class="flex align-start"> -->
    <main>
      <member-list @notLike="notLikeMember" @like="addLike"/>
    </main>
  </section>
</template>

<script>
import memberList from "@/components/MemberList.vue";
import memberFilter from "@/components/MemberFilter.vue";
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
    async addLike(member) {
      console.log("like");

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
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
      this.$store.dispatch({ type: "loadMembers", filterBy: this.filterBy });
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  created() {
    if (this.loggedInUser) {
      this.filterBy.gender = this.loggedInUser.interestedIn.gender;
      this.filterBy.minAge = this.loggedInUser.interestedIn.minAge;
      this.filterBy.maxAge = this.loggedInUser.interestedIn.maxAge;
      this.$store.dispatch({ type: "loadMembers", filterBy: this.filterBy });
    }
  },
  watched: {
    loggedInUser() {
      if (this.loggedInUser)
        this.$store.dispatch({ type: "loadMembers", filterBy: this.filterBy });
    }
  },
  components: {
    memberList,
    memberFilter
  }
};
</script>

<style scoped>
main {
  width: 100%;
  padding: 20px 20px;
}
</style>