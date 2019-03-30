<template>
  <section v-if="loggedInUser" class="home-page">
    <div class="home-content-container">
      <div class="member-filter-container">
        <member-filter @setFilter="setFilter"/>
      </div>
      <!-- <main class="flex align-start"> -->
      <main>
        <member-list :members="members" @notLike="notLikeMember" @like="addLike" @chat="startChat"/>
      </main>
    </div>
  </section>
</template>

<script>
import memberList from "@/components/MemberList.vue";
import memberFilter from "@/components/MemberFilter.vue";
import Swal from "sweetalert2";
import { EVENT_BUS, EV_START_CHAT } from "@/event-bus.js";

export default {
  data() {
    return {
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
        //match
        Swal.fire({
          title: "You have a new match !!!",
          type: "success",
          showCancelButton: true,
          confirmButtonText: "Send a message",
          cancelButtonText: "Later"
        }).then(result => {
          if (result.value) {
            EVENT_BUS.$emit(EV_START_CHAT, member);
          }
        });
      }
    },
    notLikeMember(memberId) {
      this.$store.dispatch({ type: "notLikeMember", memberId });
    },
    startChat(member) {
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
    },
    members() {
      return this.$store.getters.members;
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
.member-filter-container {
  width: 100%;
  max-width: 1200px;
}
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.home-content-container {
  max-width: 1200px;
  width: 100%;
}
</style>