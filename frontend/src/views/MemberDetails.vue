<template>
  <section v-if="member" class="member-details">
    <router-link to="/">
      <h3 class="backToAll">BACK TO ALL</h3>
    </router-link>
    <div class="img-section">
      <h1>
        <span class="online-status" :class="{on: this.member.online, off: !this.member.online}"/>
        {{member.name}}, {{memberAge}}
      </h1>
      <img class="mainImg" :src="member.mainImage">
      <div class="img-gallery">
        <div class="member-img" v-for="(img, idx) in member.images" :key="idx" :src="img">
          <img :src="img">
        </div>
      </div>
    </div>
    <div class="details-section">
      <h2>{{member.name}}'s details</h2>
      <h4>Height: {{member.height}}cm</h4>
      <h4>City: {{member.city}}</h4>
      <h4>Marital status: {{member.maritalStatus}}</h4>
      <h4>Children: {{childrenInfo}}</h4>
      <hr>
      <h2>{{member.name}} wants to meet:</h2>
      <h4>{{partnerGenderNAge}}</h4>
      <div class="likes-panel">
        <font-awesome-icon icon="heart" @click.stop="like"/>
        <font-awesome-icon icon="times" @click.stop="notLike"/>
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
  color: rgb(54, 53, 53);
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.img-section {
  margin-right: 30px;
}
.mainImg {
  width: 300px;
  max-height: 400px;
  object-fit: contain;
}
.img-gallery {
  display: flex;
  width: 500px;
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
  flex-direction: column;
}
.details-section {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
img {
  max-width: 300px;
  max-height: 400px;
}
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
