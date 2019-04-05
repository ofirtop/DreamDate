<template>
  <section class="match-cmp">
    <div v-if="currentMatchMember" class="centered animated delay-2s fadeInUp">
      <div class="flex content-center">
        <img class="match " :src="loggedInUser.mainImage">
        <img class="match " :src="currentMatchMember.mainImage">
      </div>
      <div class="newMatch ">You have New Match !</div>
      <div class="flex space-between newMatch">
        <div class="underline pointer" @click="goToProfilePage">See Profile</div>
        <div class="underline pointer" @click="closeAnimation">Later</div>
      </div>
    </div>
  </section>
  <!-- <section class="match-cmp">
    <div v-if="currentMatchMember" class="centered animated delay-2s fadeInUp">
      <div class="flex">
        <img class="match animated delay-2s fadeInUp" :src="loggedInUser.mainImage">
        <img class="match animated delay-2s fadeInUp" :src="currentMatchMember.mainImage">
      </div>
      <div class="newMatch animated delay-2s fadeInUp">You have New Match !</div>
      <div class="flex space-between newMatch">
        <div
          class="underline cursor animated delay-1s fadeInUp"
          @click="goToProfilePage"
        >See Profile</div>
        <div class="underline cursor animated delay-1s fadeInUp" @click="closeAnimation">Later</div>
      </div>
    </div>
  </section> -->
</template>

<script>
export default {
  name: "match-ad",
  data() {
    return {
      
    };
  },
  computed: {
    currentMatchMember() {
      console.log('MatchAd:getters got new value: ');
      return this.$store.getters.match;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  watch: {
  },
  methods: {
    goToProfilePage() {
      this.$router.push("/member/" + this.currentMatchMember._id);      
      this.$emit("removeMatch");
    },
    closeAnimation() {
      console.log('methods:closeAnimation');
      this.$emit("removeMatch");
    }
  },
  async created() {
    console.log('Match cmp created')
  }
};
</script>

<style scoped lang="scss">
@import "../sass/_variables.scss";

.centered {
  // position: fixed;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  // padding: 50px;
  // background-color:lightgrey;
    position: fixed;
    top: 15%;
    left: 26%;
    -webkit-transform: translate(-50%, -50%);
    /* transform: translate(-50%, -50%); */
    padding: 50px;
    background: rgba(0, 0, 0, 0.1); 
    width: 50vw;
    height: 35vh;
    
}
.match {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 5px solid white;
  box-shadow: 0px 0px 32px 32px #fff;
}
.newMatch {
  margin-top: 40px;
  font-family: "Dancing Script", cursive;
  font-size: 40px;
  font-weight: 900;
  color: white;
  text-shadow: 4px 1px 17px #a44d11;
}
.pointer {
  cursor: pointer;
}
.underline {
  border-bottom: 1px solid white;
}
.match2.on {
  width: 255px;
  height: 255px;
  visibility: visible;
  position: fixed;
  border-radius: 50%;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
}
</style>