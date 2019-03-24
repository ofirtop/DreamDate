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
          <img class="user-img" @click="changeMainImg(img, idx)" v-for="(img, idx) in user.images" :key="idx" :src="img">
          <input type="file" name="pic" accept="image/*">
        </div>
        <el-button @click="saveProfile" v-if="saveImgBtn" type="primary">Save main image</el-button>
      </div>
      <div class="details-section" v-if="!isEdit">
        <el-button @click="editProfile" type="primary">Edit Profile</el-button>
        <h2>My details</h2>
        <h3> {{user.name}}</h3>
        <h4>Height: {{user.height}}cm</h4>
        <h4>City: {{user.city}}</h4>
        <h4>Marital status: {{user.maritalStatus}}</h4>
        <h4>Children: {{childrenInfo}}</h4>
        <hr>
        <h2>I want to meet:</h2>
        <h4>{{partnerGenderNAge}}</h4>
      </div>
    
    <div v-if="isEdit" class="edit-profile">
      <h2>Edit your details</h2>
      <h3>{{user.name}}</h3>
      <label>Height</label>
      <el-input-number size="small" v-model="user.height"></el-input-number>
      <label>City</label>
      <el-select v-model="user.city" allow-create placeholder="Choose or add your city">
        <el-option v-for="(city, idx) in cities" :key="idx" :label="city.label" :value="city.value"></el-option>
      </el-select>
      <label>Marital status</label>
      <el-select v-model="user.maritalStatus" placeholder="Select your status">
        <el-option v-for="(status, idx) in statuses" :key="idx" :label="status.label" :value="status.value"></el-option>
      </el-select>
      <label>Children</label>
      <el-input-number size="small" v-model="user.numOfChildren"></el-input-number>
      <label>Date of Birth</label>
      <el-date-picker v-model="user.dateOfBirth" type="date" placeholder="Pick a date"></el-date-picker>
      <hr>
      <h2>Dream your partner</h2>
      <h4>I'd like to meet:</h4>
      <label>Gender</label>
      <el-select v-model="user.interestedIn.gender" placeholder="Select gender">
        <el-option v-for="(gender, idx) in genders" :key="idx" :label="gender.label" :value="gender.value"></el-option>
      </el-select>
      <label>Age</label>
      <el-slider v-model="age" range :min="18" :max="120"></el-slider>
      <el-button type="success" @click="saveProfile" >Save Profile</el-button>
      </div>
    </div>
  </section>
</template>
<script>
import memberService from '../services/member.service';
export default {
  data() {
    return {
      user: null,
      saveImgBtn: false,
      isEdit: false,
      cities: [],
      statuses: [{value: 'single', label: 'single'},{value: 'divorced', label: 'divorced'}, {value: 'married', label: 'married'}, {value: 'born to be free!', label: 'born to be free!'}],
      genders: [{value: 'female', label: 'female'},{value: 'male', label: 'male'}],
      age: []
    };
  },
  created() {
    let userId = this.$route.params.userId;
    if (!this.loggedInUser || this.loggedInUser._id !== userId) this.$router.push("/");
    else {
      this.$store.dispatch({ type: "loadMemberById", memberId: userId })
        .then(res => this.user = res)
        .then(() => {
          let namesCities = memberService.getCities();
          this.cities = namesCities.map(city => {
            return { value: city, label: city };
          });
          this.age = [this.user.interestedIn.minAge, this.user.interestedIn.maxAge]
        })
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
    saveProfile() {
      this.isEdit = false;
      this.saveImgBtn = false;
      console.log('Save updated profile: ', this.user);
    },
    editProfile() {
      this.isEdit = true;
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
  },
  watch: {
    loggedInUser() {
      let userId = this.$route.params.userId;
      if (!this.loggedInUser || this.loggedInUser._id !== userId) this.$router.push("/");
    }
  },
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
    cursor: pointer;
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
.edit-profile {
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-end
}
.edit-profile >* {
  width: 400px;
}
</style>
