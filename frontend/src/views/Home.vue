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
    <div v-if="currentMatchMember" class="centered">
      <div class="flex">
        <img class="match animated delay-2s fadeInUp" :src="loggedInUser.mainImage"  >
        <!-- <img class="match2" :class="{on:currentMatchMember}" :src="currentMatchMember.mainImage"> -->
        <img class="match animated delay-2s fadeInUp" :src="loggedInUser.mainImage"  >
      </div>
      <div class="newMatch animated delay-2s fadeInUp">You have New Match !</div>
      <div class="flex space-between newMatch">
        <div class="underline cursor animated delay-2s fadeInUp" @click="goToProfilePage">See Profile</div>
        <div class="underline cursor animated delay-2s fadeInUp" @click="closeAnimation">Later</div>
      </div>
    </div>
    <button @click="setMember">set member</button>
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
    setMember(){
      //SHOULD BE REMOVED AFTER FIX NOTIFICATION - THIS IS FOR EMULATING THE ANIMATION ROUTING...
    this.currentMatchMember = this.members[1]
    },
    goToProfilePage(){
      this.$router.push("/member/" + this.currentMatchMember._id);
    },
    closeAnimation(){
      this.currentMatchMember = '';
    },
    async addLike(member) {
      console.log("like");

      await this.$store.dispatch({ type: "addLikeToMember", member });

      if (member.likes.iLike && member.likes.likeMe) {
         this.currentMatchMember = member;
        // console.log(this.currentMatchMember.mainImage)
        // setTimeout(() => {
        //   this.currentMatchMember='';
        // }, 5000);
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

.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
  /* box-shadow: 0px 0px 5px 5px orange; */
  padding:50px;
  /* border:1px solid black; */
}
.match{
  width:200px;
  height:200px;
  border-radius:50%;
  border:5px solid white;
  box-shadow: 0px 0px 40px 40px #FFF;
}
.newMatch{
  margin-top:20px;   
  font-family: 'Dancing Script', cursive;
  font-size:40px;
  font-weight: 900;
  color:white;
  text-shadow: 4px 1px 17px #A44D11;
}
.cursor{
  cursor: pointer;
}
.underline{
  border-bottom: 1px solid white;
}
.match2.on{
  width:255px;
  height:255px;
  visibility:visible;
  position: fixed;
  border-radius: 50%;
  top: 50%;
  left: 60%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}
</style>