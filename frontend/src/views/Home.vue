<template>
  <section class="home-page">
    <section class="mid-screen flex items-center content-center">
      <login-demo-user v-if="!loggedInUser"></login-demo-user>
    </section>
    <member-list></member-list>
  </section>
</template>

<script>
import MemberList from "../components/MemberList.vue";
import loginDemoUser from "@/components/LoginDemoUser.vue";

export default {
  computed:{
    loggedInUser(){
      return this.$store.getters.loggedInUser;
    }
  },
  components: {
    loginDemoUser,
    MemberList
  }
};
</script>

<style>

</style>
