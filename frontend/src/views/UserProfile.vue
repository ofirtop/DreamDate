<template>
  <section v-if="user" class="user-profile">
    <div class="screen" v-if="isEdit||uploadImg"></div>
    <!-- <div class="title">
    </div> -->
    <edit-profile @addChanges="addChanges" @close="isEdit = false" :profile="user" :loggedInUser="loggedInUser" v-if="isEdit"></edit-profile>
    <upload-img v-if="uploadImg" @addChanges="addChanges" @close="uploadImg = false" :profile="user"></upload-img>
    <div class="container">
      <div class="main-section">
        <div class="info">
        <div class="name-section flex items-center">
          <h2>{{user.name}}, {{userAge}}</h2>
        </div>
        <div class="save-btns flex" v-if="saveBtn">
        <el-button  @click="saveProfile" type="success">Save changes</el-button>
        <el-button  @click="clearChanges" type="danger">Cancel changes</el-button>
        </div>
        <hr>
        <div class="details-section">
          <div class="gender">{{userGender}}</div>
          <h4>{{user.descr}}</h4>
          <hr>
          <h4>Height: {{user.height}}cm</h4>
          <h4>I'm from {{user.city}}</h4>
          <h4>{{user.maritalStatus}}</h4>
          <h4>{{childrenInfo}}</h4>
          <hr>
          <h3>I want to meet</h3>
          <h4>{{partnerGenderNAge}}</h4>
          <div class="btns flex">
            <el-button size="mini" @click="editProfile" type="primary">Edit Details</el-button>
            <el-button size="mini" @click="uploadImg = !uploadImg" type="primary">Upload pic</el-button>
          </div>
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
      saveBtn: false,
      isEdit: false,
      uploadImg: false
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
    addChanges(user) {
      this.user = user;
      this.isEdit = false;
      this.uploadImg = false;
      this.saveBtn = true;
    },
    changeMainImg(imgSrc, idx) {
      let img = this.user.mainImage;
      this.user.mainImage = imgSrc;
      this.user.images.splice(idx, 1, img);
      this.saveBtn = true;
    },
    saveProfile() {
      this.isEdit = false;
      this.uploadImg = false;
      console.log('Save updated PROFILE: ', this.user);
      this.$store.dispatch({ type: 'updateUser', user: this.user });
      this.saveBtn = false;
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
      this.saveBtn = false;
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
    },
    userGender(){
      if (this.user.gender === 'female') return 'Woman'
      else if (this.user.gender === 'male') return 'Woman'
      else return 'Gender is not defined'
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
    editProfile,
    uploadImg
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
  background-color: rgba(206, 201, 201, 0.932);
  z-index: 3;
}
.title {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.container {
  max-width: 80%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  background-color: rgba(248, 248, 248, 1);
  border-radius: 2px;
  margin: 10px;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
/* .container:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
} */
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
  display: flex;
  flex-direction: column;
  margin: 75px auto 0 auto;
  width: 1200px;
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
/* .user-img:hover,
.mainImg:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
} */
h2 {
  font-size: 1.5em;
  font-weight: bold;
}
.img-gallery {
  display: flex;
  flex-wrap: wrap;
  width: 500px;
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
  margin: 10px 10px 10px 0;
}
input {
  width: 50%;
}
@media (max-width: 700px){
  .user-profile {
    width:100%;
    margin: 100px 0 0 0;
  }
  .main-section {
    flex-direction: column;
    width: 100%;
  }
  .container {
    width: 100%;
    margin: 0;
    max-width: 100%;
  }
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
.save-btns {
  justify-content: center;
}
}
</style>
