<template>
  <section class="match-cmp">
    <div v-if="currentMatchMember" class="centered animated delay-2s fadeInUp">
      <div class="newMatch ">It's a Match!</div>
      <div class="newMatch subtitle mt-2">You and {{currentMatchMember.name}} have liked each other.</div>
      <div class="mt-5 flex content-center">
        <img class="match " :src="currentMatchMember.mainImage">
        <img class="match " :src="loggedInUser.mainImage">
      </div>
      <div class="flex content-center newMatch actionBar mt-5">
        <div class="action underline pointer" @click="goToProfilePage">See Profile</div>
        <div class="action underline pointer" @click="closeAnimation">Later</div>
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
    top: 0;
    left: 0;
    -webkit-transform: translate(-50%, -50%);
    padding: 50px;
    background: rgba(28, 28, 28, 0.8);
    width: 100vw;
    height: 100vh;
    z-index: 9999;
}
.match {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 3px solid white;
  margin: 0 25px;
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
.action{
  margin-left:55px;
  margin-right:100px;
}

</style>