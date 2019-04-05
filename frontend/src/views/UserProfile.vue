<template>
  <section v-if="user" class="user-profile">
    <div class="screen" v-if="isEdit"></div>
    <edit-profile  @addChanges="saveProfile" @close="isEdit=false" :profile="this.user" v-if="isEdit"></edit-profile>
    <div  class="container flex">
      <div class="main-section flex">
        <div class="info">
        <div class="name-section flex items-center">
          <h2>{{user.name}}, {{userAge}}</h2>
        </div>
        <hr>
        <div class="details-section">
          <div class="gender">{{userGender}}</div>
          <p>{{user.descr}}</p>
          <hr>
          <p>Height: {{user.height}}cm</p>
          <p>I'm from {{user.city}}</p>
          <p>{{user.maritalStatus}}</p>
          <p>{{childrenInfo}}</p>
          <hr>
          <h3>I want to meet</h3>
          <p>{{partnerGenderNAge}}</p>
          <div class="btns full-width items-center flex">
            <el-button class="editBtn" size="mini" @click="editProfile" type="primary">Edit Details</el-button>
            <i class="el-icon-edit-outline clickable hidden" @click="editProfile"></i>
            <upload-img v-if="isMobile" class="mobile-upload-img" @addChanges="saveProfile" :profile="user"></upload-img>
          </div>
        </div>
        </div>
        <div class="img-section">
          <div class="mainImg" :style="{backgroundImage: `url(${user.mainImage})`}"></div>
          <a class="remove-image" href="#" style="display: inline;" @click.stop="removeMainImg">&#215;</a>
        </div>
      </div>
      <div class="img-gallery mt-1 mb-1">
        <upload-img v-if="!isMobile" class="desk-upload-img" @addChanges="saveProfile" :profile="user"></upload-img>
        <div class="user-img clickable" v-for="(img, idx) in user.images" :key="idx" @click="changeMainImg(img, idx)">
          <a class="remove-image" href="#" @click.stop="removeImg(img, idx)" style="display: inline;">&#215;</a>
          <div class="img" :style="{backgroundImage: `url(${img})`}"></div>
        </div>
      </div>
      </div>
  </section>
</template>
<script>
import memberService from '../services/member.service';
import editProfile from '@/components/EditProfile.vue';
import uploadImg from '@/components/uploadImg.vue';

export default {
  data() {
    return {
      user: null,
      isEdit: false,
      // isMobile: false
    };
  },
  created() {
    let userId = this.$route.params.userId;
    if (!this.loggedInUser || this.loggedInUser._id !== userId)
      this.$router.push('/');
    else {
      this.$store
        .dispatch({ type: 'loadMemberById', memberId: userId })
        .then(res => {
          this.user = JSON.parse(JSON.stringify(res))          
        })
    }
    console.log('LoggedInUser', this.loggedInUser);
  },
  methods: {
    changeMainImg(imgSrc, idx) {
      let img = this.user.mainImage;
      this.user.mainImage = imgSrc;
      this.user.images.splice(idx, 1, img);
      this.saveProfile(this.user);
    },
    saveProfile(user) {
      this.user = user;
      this.isEdit = false;
      user = JSON.parse(JSON.stringify(user));  
      this.$store.dispatch({ type: 'updateUser', user });
    },
    editProfile() {
      this.isEdit = true;
    },
    removeImg(img, idx) {
      this.user.images.splice(idx, 1);
      this.saveProfile(this.user);
    },
    removeMainImg() {
      if(this.user.images[0]) {
        this.user.mainImage = this.user.images[0];
        this.user.images.splice(0, 1)
      } else this.user.mainImage = '';
      this.saveProfile(this.user);
    },
  },
  computed: {
    loggedInUser() {
      let user = this.$store.getters.loggedInUser;
      return JSON.parse(JSON.stringify(user))
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
    },
    userGender(){
      if (this.user.gender === 'female') return 'Woman'
      else if (this.user.gender === 'male') return 'Man'
      else return 'Gender is not defined'
    },
    isMobile(){
      let size = window.innerWidth;
      return (size < 740)
    }
  },
  watch: {
    loggedInUser() {
      let userId = this.$route.params.userId;
      if (!this.loggedInUser || this.loggedInUser._id !== userId)
        this.$router.push('/');
    },
  },
  components: {
    editProfile,
    uploadImg
  }
};
</script>
<style scoped>
p {
  margin: 5px 0;
}
.screen {
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(206, 201, 201, 0.932);
  z-index: 3;
}
.title {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.container {
  max-width: 60%;
  flex-direction: column;
  background-color: rgba(248, 248, 248, 1);
  border-radius: 2px;
  margin: 10px;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.main-section {
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
  display: flex;
  flex-direction: column;
  margin: 75px auto 0 auto;
  max-width: 1200px;
  width: 100%
}
.img-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  
}
.mainImg {
  width: 300px;
  height: 300px;
  background-position: right top;
  background-repeat: no-repeat;
  background-size: contain;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.user-img {
  width: 150px;
  height: 150px;
  margin: 10px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  color: gray;
  font-size: 2em;
  position: relative;
}
.user-img .img {
  width: 150px;
  height: 150px;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
}
h2 {
  font-size: 1.5em;
  font-weight: bold;
}
.img-gallery {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  cursor: pointer;
  justify-content: center;
  margin: 10px;
}
.img-gallery>* {
  margin: 10px;
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
  margin: 10px 10px 10px 0;
}
input {
  width: 50%;
}
.remove-image {
display: none;
position: absolute;
top: -10px;
right: -10px;
border-radius: 10em;
padding: 2px 6px 3px;
text-decoration: none;
font: 700 21px/20px sans-serif;
background: #555;
border: 3px solid #fff;
color: #FFF;
box-shadow: 0 2px 6px rgba(0,0,0,0.5), inset 0 2px 4px rgba(0,0,0,0.3);
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  transition: background 0.5s;
}
.remove-image:hover {
 background: #E54E4E;
  padding: 3px 7px 5px;
  top: -11px;
  right: -11px;
}
.remove-image:active {
 background: #E54E4E;
  top: -11px;
  right: -11px;
}
.mobile-upload-img{
  display:none;
}
@media (max-width: 740px){
  .user-profile {
    width: 100%;
    margin: 80px auto;
  }
  .main-section {
    flex-direction: column;
    width: 100%;
    margin: 0;
  }
  .container {
    width: 100%;
    margin: 0;
    max-width: 100%;
  }
  .user-img,
  .user-img .img{
  width: 100%;
  height: 100%;
  margin: 0;
  background-size: contain;
}
 .user-img {
   background-color: rgba(168, 166, 166, 0.233);
   height: 400px;
 }
.details {
  width: 95%;
  padding: 0 10px;
  max-width: unset;
  margin: 0;
} 
.img-gallery {
    flex-direction: column;
    width: 95%;
    align-items: center
  }
.img-section {
  margin: 10px;
}
.mainImg {
  width: 100%;
  background-size: contain;
  height: 400px;
}
.save-btns {
  justify-content: center;
}
.mobile-upload-img {
  display: inline-block;
}
.btns {
  justify-content: center;
  height: 64px;
  font-size: 64px;
  margin-top:10px;
}
.editBtn {
  display: none;
}
.el-icon-edit-outline {
  display: inline-block;
  color: gray;
  margin-right: 20px;
  
}
.desk-upload-img {
  display: none;
}
}
</style>
