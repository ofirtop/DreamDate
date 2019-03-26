<template>
  <section v-if="member" class="member-details">
    <!-- <router-link to="/">
      <h3 class="backToAll">BACK TO ALL</h3>
    </router-link> -->
    <div class="container">
    <div class="main-section">
      <div class="info">
        <div class="name-section flex items-center">
          <span class="online-status mr-1" :class="{on: this.member.online, off: !this.member.online}"/>
          <h1>{{member.name}}, {{memberAge}}</h1>
        </div>
        <div class="details">
          <hr>
          <!-- <h2>{{member.name}}'s details</h2> -->
          <h4>About: {{member.descr}}</h4>
          <hr>
          <h4>Height: {{member.height}}cm</h4>
          <h4>I'm from {{member.city}}</h4>
          <h4>I'm {{member.maritalStatus}}</h4>
          <h4>I have {{childrenInfo}}</h4>
          <hr>
          <h2>I want to meet:</h2>
          <h4>{{partnerGenderNAge}}</h4>
        </div>
      </div>
      <div class="main-img">
        <div class="mainImg" :style="{backgroundImage: `url(${member.mainImage})`}"></div>
        <div class="likes-panel">
            <font-awesome-icon icon="heart" @click.stop="like"/>
            <font-awesome-icon icon="times" @click.stop="notLike"/>
        </div>
      </div>
    </div>
      <h4>Gallery</h4>
    <div class="img-gallery mt-1">
        <div class="member-img" :style="{backgroundImage: `url(${img})`}" v-for="(img, idx) in member.images" :key="idx" >
        </div>
    </div>
   </div>   
    
  </section>
</template>
<script>
export default {
  data() {
    return {
      member: null
    };
  },
  computed: {
    memberAge() {
      let year = +this.member.dateOfBirth.substring(0, 4);
      return new Date().getFullYear() - year;
    },
    childrenInfo() {
      if (!this.member.numOfChildren) return `No`;
      if (this.member.numOfChildren === 1) return `1 child`;
      else return `${this.member.numOfChildren} kids`;
    },
    partnerGenderNAge() {
      if (this.member.interestedIn.gender === "female") {
        return `Lady, ${this.member.interestedIn.minAge} - ${
          this.member.interestedIn.maxAge
        } years old`;
      } else
        return `Gentelman, ${this.member.interestedIn.minAge} - ${
          this.member.interestedIn.maxAge
        } years old`;
    }
  },
  created() {
    let memberId = this.$route.params.userId;
    this.$store
      .dispatch({ type: "loadMemberById", memberId })
      .then(res => (this.member = res));
      this.$store.dispatch({type: 'watchMember', memberId});  
  }
};
</script>
<style scoped lang="scss">

a {
  text-decoration: none;
  color: black;
}
.member-details {
  display: flex;
  flex-direction: center;
  align-items: center;
  justify-content: center;
  border: 1px solid gray;
}
.container {
  display: flex;
  flex-direction: column;
  width: 50%;
  background-color: gray;
  margin: 20px;
}
.main-section {
  display: flex;
  justify-content: space-around;
  margin: 10px;
}
.mainImg {
    width: 200px;
    height: 250px;
    background-position: center top;
    background-repeat: no-repeat;
    background-size: cover;
}
.img-gallery {
  display: flex;
  width: 100%;
  justify-content: center;
  border: 1px solid gray;
}
.member-img {
  width: 150px;
  height: 150px;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
}
.member-img img {
  
  width: 100%;
  height: 100%;
}

h1 {
  font-size: 3em;
  font-weight: bold;
}
// h2 {
//   font-size: 2em;
//   font-weight: bold;
// }
// .details-section {
//   margin-top: 100px;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   border: 1px solid gray;
// }
// img {
//   max-width: 300px;
//   max-height: 400px;
// }
.likes-panel {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 10px;
  align-items: center;
  height: 50px;
}
.backToAll {
  padding: 5px;
  border: gray;
  background-color: lightblue;
}
.online-status {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  &.on {
    background-color: green;
  }
  &.off {
    background-color: red;
  }
}
</style>
