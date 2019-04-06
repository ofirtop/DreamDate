<template>
  <section class="match-cmp">
    <div v-if="currentMatchMember" class="centered animated delay-2s fadeInUp">
      <div class="newMatch ">It's a Match!</div>
      <div class="newMatch subtitle mt-2">You and {{currentMatchMember.name}} have liked each other.</div>
      <div class="mt-5 flex content-center">
        <img class="match " :src="loggedInUser.mainImage">
        <img class="match " :src="currentMatchMember.mainImage">
      </div>
      <div class="flex space-around newMatch actionBar mt-5">
        <div class="underline pointer" @click="goToProfilePage">See Profile</div>
        <div class="underline pointer" @click="closeAnimation">Later</div>
      </div>
    </div>
  </section>
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
    position: fixed;
    top: 15%;
    left: 17.5%;
    -webkit-transform: translate(-50%, -50%);
    padding: 25px;
    background: rgba(28, 28, 28, 0.8);
    width: 65vw;
    height: 60vh;
    
}
.match {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 3px solid white;
  margin: 0 25px;
  // border: 5px solid white;
  // box-shadow: 0px 0px 32px 32px #fff;
}
.newMatch {
  text-align: center;
  font-family: "Dancing Script", cursive;
  font-size: 107px;
  font-weight: 900;
  color: white;
  text-shadow: 4px 1px 17px #a44d11;
}
.newMatch.actionBar{
  font-size: 26px;
  font-family: inherit;  
  font-weight: 400;
}
.newMatch.subtitle {
  font-family: inherit;
  font-size: 26px;
  text-align: center;
  font-weight: 400;
  color: white;
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