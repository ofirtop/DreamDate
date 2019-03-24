<template>
  <section class="user-filter">
    <form>
      <div class="gender-filter">
        <el-radio-group size="small" @change="setFilter" v-model="filterBy.gender">
          <el-radio-button label="female"></el-radio-button>
          <el-radio-button label="male"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="city-filter">
        <el-select
          size="small"
          @change="setFilter"
          v-model="filterBy.city"
          placeholder="Select location">
          <el-option
            v-for="city in cities"
            :key="city.value"
            :label="city.label"
            :value="city.value">
            </el-option>
        </el-select>
      </div>
      <div class="height-filter">
        <el-input
          size="small"
          @input="setFilter"
          type="number"
          placeholder="Enter min-height"
          v-model="filterBy.minHeight">
          </el-input>
      </div>
      <div class="age-filter">
        <label>Age</label>
        <el-slider
          @change="setFilter"
          :key="rangeKey"
          v-model="filterBy.age"
          range
          :min="18"
          :max="100">
          </el-slider>
      </div>
      <el-button @click="clearFilter" type="info">Clear Filter</el-button>
    </form>
  </section>
</template>
<script>
import memberService from '../services/member.service';

export default {
  data() {
    return {
      filterBy: {
        gender: '',
        age: [18, 100],
        minHeight: null,
        city: ''
      },
      rangeKey: 1,
      cities: []
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  methods: {
    setFilter() {
      let filter = {
        gender: this.filterBy.gender,
        minAge: this.filterBy.age[0],
        maxAge: this.filterBy.age[1],
        minHeight: this.filterBy.minHeight,
        city: this.filterBy.city
      };
      this.$emit('setFilter', filter);
    },
    clearFilter() {
      this.filterBy = {
        gender: '',
        age: [18, 100],
        minHeight: null,
        city: ''
      };
      this.setFilter();
    },
    loggedInUserSet() {
      this.filterBy.gender = this.loggedInUser.interestedIn.gender;
      this.filterBy.age[0] = this.loggedInUser.interestedIn.minAge;
      this.filterBy.age[1] = this.loggedInUser.interestedIn.maxAge;
    }
  },
  watch: {
    loggedInUser() {
      if (this.loggedInUser) this.loggedInUserSet();
      this.setFilter();
      this.rangeKey += 1;
    }
  },
  created() {
    let namesCities = memberService.getCities();
    this.cities = namesCities.map(city => {
      return { value: city, label: city };
    });
    this.cities.unshift({ value: '', label: 'All cities' });
    if (this.loggedInUser) this.loggedInUserSet()
    this.setFilter();
  }
};
</script>
<style scoped>
section {
  height: 100px;
  padding: 10px;
  background-color: rgba(138, 143, 143, 0.493);
  color: #409eff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
form {
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
}
.age-filter {
  width: 200px;
}
</style>
