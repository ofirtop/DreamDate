<template>
  <section v-if="user" class="user-profile">
    <div class="screen" v-if="isEdit"></div>
    <div class="title">
      <h1>My Profile</h1>
      <el-button type="primary" @click="toAll">Back to All</el-button>
    </div>
    <edit-profile @saveProfile="saveProfile" @close="isEdit = false" :profile="user" :loggedInUser="loggedInUser" v-if="isEdit"></edit-profile>
    <div class="container">
      <div class="main-section">
        <div class="info">
        <div class="name-section flex items-center">
          <h1>{{user.name}}, {{userAge}}</h1>
        </div>
        <div class="details-section">
          <h4>{{user.descr}}</h4>
          <hr>
          <h4>Height: {{user.height}}cm</h4>
          <h4>I'm from {{user.city}}</h4>
          <h4>{{user.maritalStatus}}</h4>
          <h4>{{childrenInfo}}</h4>
          <hr>
          <h2>I want to meet</h2>
          <h4>{{partnerGenderNAge}}</h4>
          <el-button @click="editProfile" type="primary">Edit Details</el-button>
          <el-button @click="addImg" type="primary">Add image</el-button>
        </div>
        </div>
        <div class="img-section">
          <img class="mainImg" :src="user.mainImage">
        </div>
      </div>
      <div class="img-gallery mt-1 mb-1">
        <div
          class="user-img clickable"
          :style="{backgroundImage: `url(${img})`}"
          v-for="(img, idx) in user.images"
          :key="idx"
          @click="changeMainImg(img, idx)"
        ></div>
      </div>
      </div>
      <div class="img-btns flex">
      <el-button  @click="saveProfile" v-if="saveImgBtn" type="primary">Save main image</el-button>
      <el-button  @click="clearChanges" v-if="saveImgBtn" type="primary">Cancel changes</el-button>
      </div>
  </section>
</template>
<script>
import memberService from '../services/member.service';
import editProfile from '@/components/EditProfile.vue'

export default {
  data() {
    return {
      user: null,
      saveImgBtn: false,
      isEdit: false,
    };
  },
  created() {
    let userId = this.$route.params.userId;
    if (!this.loggedInUser || this.loggedInUser._id !== userId)
      this.$router.push('/');
    else {
      this.$store
        .dispatch({ type: 'loadMemberById', memberId: userId })
        .then(res => (this.user = res))
    }
    console.log('LoggedInUser', this.loggedInUser);
  },
  methods: {
    changeMainImg(imgSrc, idx) {
      let img = this.user.mainImage;
      this.user.mainImage = imgSrc;
      this.user.images.splice(idx, 1, img);
      this.saveImgBtn = true;
    },
    saveProfile(user) {
      this.isEdit = false;
      this.user = user;
      console.log('Save updated PROFILE: ', this.user);
      this.$store.dispatch({ type: 'updateUser', user: this.user });
    },
    editProfile() {
      this.isEdit = true;
    },
    clearChanges() {
      this.user = this.loggedInUser;
      this.age = [
        this.user.interestedIn.minAge,
        this.user.interestedIn.maxAge
      ];
    },
    toAll() {
      this.$router.push('/');
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    userAge() {
      let year = +this.user.dateOfBirth.substring(0, 4);
      let age = new Date().getFullYear() - year;
      if (!age) return 18;
      else return age;
    },
    childrenInfo() {
      if (this.user.numOfChildren === 0) return `I don't have kids`;
      if (this.user.numOfChildren === 1) return `I have 1 child`;
      else return `I have ${this.user.numOfChildren} kids`;
    },
    partnerGenderNAge() {
      if(!this.user.interestedIn.gender || !this.user.interestedIn.minAge || !this.user.interestedIn.maxAge) return '...';
      if (this.user.interestedIn.gender === 'female') {
        return `Woman, ${this.user.interestedIn.minAge} - ${
          this.user.interestedIn.maxAge
        } years old`;
      } else
        return `Man, ${this.user.interestedIn.minAge} - ${
          this.user.interestedIn.maxAge
        } years old`;
    }

  },
  watch: {
    loggedInUser() {
      let userId = this.$route.params.userId;
      if (!this.loggedInUser || this.loggedInUser._id !== userId)
        this.$router.push('/');
    }
  },
  components: {
    editProfile
  }
};
</script>
<style scoped>
.screen {
  position: fixed;
  top:0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(248, 244, 244, 0.932);
  z-index: 3;
}
.title {
  display: flex;
  justify-content: space-between;
  width: 100%;
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
a {
  text-decoration: none;
  color: white;
}
.user-profile {
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 100px 10%;
}
.img-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.mainImg {
  width: 200px;
  /* max-height: 250px; */
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.img-gallery {
  display: flex;
  justify-content: center;
}
.user-img {
  width: 150px;
  height: 150px;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 10px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.user-img img {
  width: 100%;
  height: 100%;
}
.user-img:hover,
.mainImg:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
h1 {
  font-size: 2em;
  font-weight: bold;
}
.img-gallery {
  display: flex;
  width: 300px;
  cursor: pointer;
}
.details-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1em;

}
.name-section {
  margin-left: 2em;
}

button {
  margin: 10px;
}
input {
  width: 50%;
}
@media (max-width: 700px){
  .user-img {
  width: 100%;
  height: 80vh;
  margin: 0;
}
.details {
  width: 95%;
  max-width: unset;
  margin: 0;
} 
.img-gallery {
    flex-direction: column;
    width: 100%;
  }
.mainImg {
  width: 100%;
  max-height: 400px;
  object-fit: contain
}
}
</style>
