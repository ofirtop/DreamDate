<template>
  <section v-if="member" class="member-details">
    <!-- <router-link to="/">
      <h3 class="backToAll">BACK TO ALL</h3>
    </router-link> -->
    <div class="container">
    <div class="main-section">
      <div class="info">
        <div class="name-section flex items-center content-center">
          <span class="online-status mr-1" :class="{on: this.member.online, off: !this.member.online}"/>
          <h1>{{member.name}}, {{memberAge}}</h1>
        </div>
        <div class="details">
          <hr>
          <!-- <h2>{{member.name}}'s details</h2> -->
          <h4>{{member.descr}}</h4>
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
        <div class="likes-panel clickable">
            <font-awesome-icon icon="heart" @click.stop="like"/>
            <font-awesome-icon icon="times" @click.stop="notLike"/>
        </div>
      </div>
    </div>
      <h4>Gallery</h4>
    <div class="img-gallery mt-1 mb-1">
        <div class="member-img clickable" 
            :style="{backgroundImage: `url(${img})`}" 
            v-for="(img, idx) in member.images" :key="idx" 
            @click="changeMainImg(img, idx)">
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
  methods: {
    changeMainImg(imgSrc, idx) {
      let img = this.member.mainImage;
      this.member.mainImage = imgSrc;
      this.member.images.splice(idx, 1, img);
    },
  },
  computed: {
    memberAge() {
      let year = +this.member.dateOfBirth.substring(0, 4);
      return new Date().getFullYear() - year;
    },
    childrenInfo() {
      if (!this.member.numOfChildren) return `no kids`;
      if (this.member.numOfChildren === 1) return `1 child`;
      else return `${this.member.numOfChildren} kids`;
    },
    partnerGenderNAge() {
      if (this.member.interestedIn.gender === "female") {
        return `Woman, ${this.member.interestedIn.minAge} - ${
          this.member.interestedIn.maxAge
        } years old`;
      } else
        return `Man, ${this.member.interestedIn.minAge} - ${
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
  align-items: center;
  justify-content: center;
}
.container {
  max-width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(248, 248, 248, 1);
  border-radius: 2px;
  margin: 10px;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.container:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.main-section {
  display: flex;
  justify-content: space-around;
  margin: 10px;
}
.details {
  max-width: 50%;
  margin: 1em;
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
  justify-content: center;
}
.member-img {
  width: 150px;
  height: 150px;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 10px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.member-img img {
  width: 100%;
  height: 100%;
}
.member-img:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
h1 {
  font-size: 2em;
  font-weight: bold;
}
.likes-panel {
  font-size: 1.5em;
  display: flex;
  justify-content: space-around;
  margin: 10px;
  align-items: center;
  height: 40px;
}
.likes-panel>*{
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.likes-panel>*:hover {
  font-size: 2em;
}
// .backToAll {
//   padding: 5px;
//   border: gray;
//   background-color: lightblue;
// }
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
 @media (max-width: 800px) {
    .container {
      width: 100%;
      max-width: unset;
    }
    .main-section {
      flex-direction: column-reverse;
      width: 100%;
    }
    .mainImg {
      width: 100%;
    }
    .member-img {
    width: 100%;
    height: 80vh;
    margin: 0;
    }
    .details {
      width: 95%;
      max-width: unset;
      margin:0;
    }
    .img-gallery {
      flex-direction: column;
      width: 100%;
    }
}
</style>
