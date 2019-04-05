<template>
  <section v-if="loggedInUser" class="home-page">
    <div class="home-content-container">
      <div class="member-filter-container">
        <member-filter @setFilter="setFilter"/>
      </div>
      <main>
        <member-list :members="members" @notLike="addNotLike" @like="addLike" @chat="startChat"/>
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
      currentMatchMember:'',
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
    addLike(member) {
      if(member.likes.likeMe) {
        this.$store.dispatch({ type:"addMatch",member })  
      }
      this.$store.dispatch({ type: "addLikeToMember", member });
    },
    addNotLike(memberId) {
      this.$store.dispatch({ type: "addNotLikeToMember", memberId });
    },
    startChat(member) {
      this.$store.dispatch({type: 'startChat', memberId: member._id, memberName: member.name});
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
      this.$store.dispatch({type: 'removeAllMembers'});
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
  padding: 0 10px;
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