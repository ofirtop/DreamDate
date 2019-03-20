<template>
  <section class="home-page">
    <section class="mid-screen flex items-center content-center">
      <login-demo-user v-if="!loggedInUser"></login-demo-user>
    </section>
    <member-match v-if="matchedMember" :member="matchedMember"></member-match>
    <!-- <member-list @like="likeMember"></member-list> -->
  </section>
</template>

<script>
import memberList from "@/components/MemberList.vue";
import loginDemoUser from "@/components/LoginDemoUser.vue";
import memberMatch from "@/components/MemberMatch.vue";

export default {
  data() {
    return {
      matchedMember: null
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  methods: {
    likeMember(member) {
      console.log("like member", member);
      this.matchedMember = member;
    }
  },
  components: {
    loginDemoUser,
    memberList,
    memberMatch
  }
};
</script>

<style>
</style>
