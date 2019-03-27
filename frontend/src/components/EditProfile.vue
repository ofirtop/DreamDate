<template>
  <section class="edit-profile flex">
    <i class="el-icon-close" @click="$emit('close')"></i>
    <h1>Edit Profile</h1>
    <div class="edit-container">
      <!-- <h2>{{user.name}}</h2> -->
      <div>
        <label>Height</label>
        <el-input-number size="mini" v-model="user.height"></el-input-number>
      </div>
      <div>
        <label>City</label>
        <el-select v-model="user.city" size="mini" allow-create placeholder="Choose your city">
          <el-option
            size="mini"
            v-for="(city, idx) in cities"
            :key="idx"
            :label="city.label"
            :value="city.value"
          ></el-option>
        </el-select>
      </div>
      <div>
        <label>Marital status</label>
        <el-select v-model="user.maritalStatus" size="mini" placeholder="Select your status">
          <el-option
            size="mini"
            v-for="(status, idx) in statuses"
            :key="idx"
            :label="status.label"
            :value="status.value"
          ></el-option>
        </el-select>
      </div>
      <div>
        <label>Children</label>
        <el-input-number size="mini" v-model="user.numOfChildren"></el-input-number>
      </div>
      <div>
        <label>Date of Birth</label>
        <el-date-picker
          v-model="user.dateOfBirth"
          type="date"
          size="mini"
          placeholder="Pick a date"
        ></el-date-picker>
      </div>
      <hr>
      <h2>Dream your partner</h2>
      <h4>I'd like to meet:</h4>
      <div>
        <label>Gender</label>
        <el-select size="mini" v-model="user.interestedIn.gender" placeholder="Select gender">
          <el-option
            v-for="(gender, idx) in genders"
            :key="idx"
            :label="gender.label"
            :value="gender.value"
          ></el-option>
        </el-select>
      </div>
      <div>
        <label>Age</label>
        <el-slider v-model="age" range :min="18" :max="120"></el-slider>
        <el-button size="mini" type="success" @click="saveProfile">Save Profile</el-button>
      </div>
    </div>
  </section>
</template>
<script>
import memberService from '../services/member.service';
export default {
  props: ['profile', 'loggedInUser'],
  data() {
    return {
        user: null,
        saveImgBtn: false,
        cities: [],
        statuses: [
        { value: 'single', label: 'single' },
        { value: 'divorced', label: 'divorced' },
        { value: 'married', label: 'married' },
        { value: 'born to be free!', label: 'born to be free!' }
      ],
      genders: [
        { value: 'female', label: 'female' },
        { value: 'male', label: 'male' }
      ],
      age: []
    };
  },
  created() {
    this.user = this.profile;
    console.log(this.user, this.profile);
    let namesCities = memberService.getCities();
    this.cities = namesCities.map(city => {
      return { value: city, label: city };
    });
    this.age = [this.user.interestedIn.minAge, this.user.interestedIn.maxAge];
  },
  methods: {
    saveProfile() {
      this.isEdit = false;
      this.saveImgBtn = false;
      this.$emit('saveProfile', this.user);
      this.$emit('close');
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
  },
  computed: {
      userAge() {
      let year = +this.user.dateOfBirth.substring(0, 4);
      return new Date().getFullYear() - year;
    },
    childrenInfo() {
      if (!this.user.numOfChildren) return `no kids`;
      if (this.user.numOfChildren === 1) return `1 child`;
      else return `${this.user.numOfChildren} kids`;
    },
    partnerGenderNAge() {
      if (this.user.interestedIn.gender === 'female') {
        return `Woman, ${this.user.interestedIn.minAge} - ${
          this.user.interestedIn.maxAge
        } years old`;
      } else
        return `Man, ${this.user.interestedIn.minAge} - ${
          this.user.interestedIn.maxAge
        } years old`;
    }
  }
};
</script>
<style scoped>
.edit-profile {
  position: fixed;
  top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  background-color: rgba(248, 248, 248, 1);

}
.edit-container {
  display: flex;
  flex-direction: column;
  background-color: rgba(248, 248, 248, 1);
  border-radius: 2px;
  margin: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.edit-container>* {
    display: flex;
    justify-content: space-between;
    margin: 5px;
}
label {
    color: black;
}
h1 {
  font-size: 2em;
  font-weight: bold;
}
button {
  margin: 10px;
}
.el-icon-close {
    align-self: flex-end;
    cursor: pointer;
    font-size: 2em;
    font-weight: bold;
}
/* input {
  width: 50%;
} */
</style>
