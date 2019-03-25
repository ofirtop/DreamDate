<template>
  <section v-if="user" class="user-profile">
    <div class="title">
      <h1>My Profile</h1>
      <router-link to="/">
        <h3 class="backToAll">GALLERY</h3>
      </router-link>
    </div>
    <hr>
    <hr>
    <div class="container">
      <div class="img-section">
        <h2>My pictures</h2>
        <img class="mainImg" :src="user.mainImage">
        <div class="img-gallery">
          <img class="user-img" v-for="(img, idx) in user.images" :key="idx" :src="img">
          <input type="file" name="pic" accept="image/*">
        </div>
      </div>
      <div class="details-section">
        <h2>My details</h2>
        <h3>Name: {{user.name}}</h3>
        <h4>Height: {{user.height}}cm</h4>
        <h4>City: {{user.city}}</h4>
        <h4>Marital status: {{user.maritalStatus}}</h4>
        <h4>Children: {{childrenInfo}}</h4>
        <hr>
        <h2>I want to meet:</h2>
        <h4>{{partnerGenderNAge}}</h4>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      user: null
    };
  },
  created() {
    let userId = this.$route.params.userId;
    if (!this.loggedInUser || this.loggedInUser._id !== userId) this.$router.push("/");
    else {
      this.$store.dispatch({ type: "loadMemberById", memberId: userId })
        .then(res => this.user = res);
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    userAge() {
      let year = +this.user.dateOfBirth.substring(0, 4);
      return new Date().getFullYear() - year;
    },
    childrenInfo() {
      if (!this.user.numOfChildren) return `No`;
      if (this.user.numOfChildren === 1) return `1 child`;
      else return `${this.user.numOfChildren} kids`;
    },
    partnerGenderNAge() {
      if (this.user.interestedIn.gender === "female") {
        return `Lady, ${this.user.interestedIn.minAge} - ${
          this.user.interestedIn.maxAge
        } years old`;
      } else
        return `Gentelman, ${this.user.interestedIn.minAge} - ${
          this.user.interestedIn.maxAge
        } years old`;
    }
  }
};
</script>
<style scoped>

.title {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.container {
  display: flex;
}
  a {
    text-decoration: none;
    color: black
  }
  .user-profile {
    display: flex;
    flex-direction: column;
    color: rgb(54, 53, 53);
    display: flex;
    align-items: flex-start;
    justify-content: center
  }
  .img-section {
    margin-right: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .mainImg {
    width: 300px;
    max-height: 400px;
    object-fit: contain
  }
  .img-gallery img {
    width: 70px;
    height: 70px;
    object-fit: cover;
  }
  h1 {
    font-size: 3em;
    font-weight: bold;
  }
  h2 {
    font-size: 2em;
    font-weight: bold;
  }
  .img-gallery {
    display: flex;
    width: 300px;
  }
  .details-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start
  }
  img {
    max-width: 300px;
    max-height: 400px
  }
.backToAll {
  padding: 5px;
  border: gray;
  background-color: lightblue
}
</style>
