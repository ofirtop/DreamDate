<template>
  <section class="edit-profile flex">
    <div class="top-line flex items-center space-between full-width">
    <h1>Edit details</h1>
    <i class="el-icon-close" @click="$emit('close')"></i>
    </div>
    <div class="edit-container">
      <!-- <h2>{{user.name}}</h2> -->
      <div>
        <label>I'm (gender)</label>
        <el-select size="mini" class="editInput" v-model="user.gender" placeholder="Select gender">
          <el-option
            v-for="(gender, idx) in genders"
            :key="idx"
            :label="gender.label"
            :value="gender.value"
          ></el-option>
        </el-select>
      </div>
      <div>
        <label>About me</label>
        <el-input
            type="textarea"
            :rows="2"
            placeholder="Tell about yourself"
            v-model="user.descr">
          </el-input>
      </div>
      <div>
        <label>Height</label>
        <el-input-number class="editInput" size="mini" v-model="user.height"></el-input-number>
      </div>
      <div>
        <label>City</label>
        <el-select class="editInput" v-model="user.city" size="mini" allow-create placeholder="Choose your city">
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
        <el-select class="editInput" v-model="user.maritalStatus" size="mini" placeholder="Select your status">
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
        <el-input-number class="editInput" size="mini" v-model="user.numOfChildren"></el-input-number>
      </div>
      <div>
        <label>Date of Birth</label>
        <el-date-picker class="editInput"
          v-model="user.dateOfBirth"
          type="date"
          size="mini"
          placeholder="Pick a date"
        ></el-date-picker>
      </div>
      <hr>
      <h2>Dream your partner!</h2>
      <h4></h4>
      <div>
        <label>Gender</label>
        <el-select size="mini" class="editInput" v-model="user.interestedIn.gender" placeholder="Select gender">
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
        <el-slider class="editInput" v-model="age" range :min="18" :max="120"></el-slider>
      </div>
        <el-button size="mini" type="info" @click="saveProfile">Save Profile</el-button>
    </div>
  </section>
</template>
<script>
import memberService from '../services/member.service';
export default {
  props: ['profile'],
  data() {
    return {
        user: null,
        cities: [],
        statuses: [
        { value: 'single', label: 'single' },
        { value: 'divorced', label: 'divorced' },
        { value: 'married', label: 'married' },
        { value: 'born to be free!', label: 'born to be free!' }
      ],
      genders: [
        { value: 'female', label: 'Woman' },
        { value: 'male', label: 'Man' }
      ],
      age: []
    };
  },
  created() {
    this.user = this.profile;
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
      this.user.interestedIn.minAge = this.age[0];
      this.user.interestedIn.maxAge = this.age[1];
      this.$emit('addChanges', this.user);
      this.$emit('close');
    },
    editProfile() {
      this.isEdit = true;
    },
    clearChanges() {
      this.user = this.profile;
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
<style scoped lang="scss">
@import '@/sass/_variables.scss';

.edit-profile {
  position: fixed;
  top: 13%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 11;
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
    align-content: center
}
.top-line {
  padding: 5px 10px;
}
label {
    color: black;
}
h1 {
  font-size: 1.5em;
  font-weight: bold;
}
.el-icon-close {
    align-self: flex-end;
    cursor: pointer;
    font-size: 2em;
    font-weight: bold;
}
.editInput,
.el-date-editor.el-input {
  width: 200px;
}
.el-slider__bar {
    background-color: $clr1;
}

button {
  margin: 10px;
  width: 100px;
  align-self: center;
  background-color: $clr1;
}
@media (max-width: 760px) {
  .edit-profile {
  position: absolute;
  top: 17%;
  width: 100vw;
  height: 100%;
}
}
</style>
