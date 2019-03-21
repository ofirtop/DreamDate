<template>
  <section class="home-page">
    <section class="mid-screen flex items-center content-center">
      <login-demo-user v-if="!loggedInUser"></login-demo-user>
    </section>
    <new-member-like-me :member="newMemberWhoLikeMe" v-if="newMemberWhoLikeMe" />
    <member-match v-if="matchedMember" :member="matchedMember" @chat="startChat" @close="matchedMember = null"></member-match>
    <member-list @like="likeMember"></member-list>
  </section>
</template>

<script>
import memberList from "@/components/MemberList.vue";
import loginDemoUser from "@/components/LoginDemoUser.vue";
import memberMatch from "@/components/MemberMatch.vue";
import newMemberLikeMe from "@/components/NewMemberLikeMe.vue";
import likeService from "@/services/like.service.js";

export default {
  data() {
    return {
      matchedMember: null,
      membersWhoLikeMe: [],
      newMemberWhoLikeMe:null
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  watch: {
    async loggedInUser() {
      if (this.loggedInUser) {
        this.membersWhoLikeMe =  likeService.queryMembersWhoLikeMe(this.loggedInUser._id);
      }
    },
    membersWhoLikeMe(){
      console.log('cmp membersWhoLikeMe', this.membersWhoLikeMe);
      this.newMemberWhoLikeMe = this.membersWhoLikeMe[this.membersWhoLikeMe.length -1]
      setTimeout(()=>{this.newMemberWhoLikeMe = null}, 5000);
    }
  },
  methods: {
    likeMember(member) {
      console.log("like member", member);
      this.matchedMember = member;
    },
    startChat(member) {
      console.log("start chat", member);
    }
  },
  components: {
    loginDemoUser,
    memberList,
    memberMatch,
    newMemberLikeMe
  }
};
</script>

<style>
</style>
