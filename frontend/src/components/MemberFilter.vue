<template>
  <section class="member-filter ">
    <form>
      <div class="filter-sections flex" >
        <div class="filter-section" :class="{'active': activeSection === 'sex'}">
          <button @click="openFilterSection('sex')" class="btn btn-filter" >Gender</button>
          <div class="filter-details-wrapper relative" >
            <div class="filter-details">
              <el-radio-group size="small" @change="setFilter" v-model="filterBy.gender">
                <el-radio-button label="female" />
                <el-radio-button label="male" />
              </el-radio-group>
              <div class="flex content-end">
                <a href="#" class="btn-apply" @click="openFilterSection('')">Apply</a>       
              </div>    
            </div>
          </div>
        </div>
        <div class="filter-section" :class="{'active': activeSection === 'city'}">
          <button @click="openFilterSection('city')" class="btn btn-filter" >Location</button>
          <div class="filter-details-wrapper relative">
            <div class="filter-details">
              <el-select size="small" @change="setFilter" v-model="filterBy.city" placeholder="Select location">
                <el-option v-for="city in cities" :key="city.value" :label="city.label" :value="city.value"></el-option>
              </el-select>  
              <div class="flex content-end">
                <a href="#" class="btn-apply" @click="openFilterSection('')">Apply</a>       
              </div>                          
            </div>
          </div>
        </div>
        <div class="filter-section" :class="{'active': activeSection === 'height'}">
          <button @click="openFilterSection('height')" class="btn btn-filter" >Height</button>
          <div class="filter-details-wrapper relative ">
            <div class="filter-details">
              <el-input size="small" @input="setFilter" type="number" placeholder="Enter min-height" v-model="filterBy.minHeight"></el-input>
              <div class="flex content-end">
                <a href="#" class="btn-apply" @click="openFilterSection('')">Apply</a>       
              </div>               
            </div>
          </div>
        </div>
        <div class="filter-section" :class="{'active': activeSection === 'age'}">
          <button @click="openFilterSection('age')" class="btn btn-filter" >Age</button>
          <div class="filter-details-wrapper relative ">
            <div class="filter-details">
              <div class="age-filter">
                <label>Age</label>
                <el-slider @change="setFilter" :key="rangeKey" v-model="filterBy.age" range :min="18" :max="100"></el-slider>
              </div> 
              <div class="flex content-end">
                <a href="#" class="btn-apply" @click="openFilterSection('')">Apply</a>       
              </div>                          
            </div>
          </div>
        </div>
        <div class="filter-section"> 
          <button @click="clearFilter" type="info"  class="btn btn-filter">Clear Filter</button>
        </div> 
      </div>
    </form>
    <div class="relative">
      <div class="filter-screen" :class="{show: activeSection !== ''}" @click="openFilterSection('')" />
    </div>
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
      cities: [],
      isShowFilter: true,
      activeSection:''
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  methods: {
    openFilterSection(section){
      this.activeSection = section;
    },
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
      this.openFilterSection('');
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
      // this.rangeKey += 1;
    }
  },
  created() {
    let namesCities = memberService.getCities();
    this.cities = namesCities.map(city => {
      return { value: city, label: city };
    });
    this.cities.unshift({ value: '', label: 'All cities' });
    if (this.loggedInUser) {
      this.loggedInUserSet()
      this.setFilter();
      }
  }
};
</script>

<style scoped lang="scss">
@import '@/sass/_variables.scss';
@import '@/sass/_btns.scss';

.member-filter {
  // border-bottom: 1px solid rgb(235, 235, 235);
  padding: 10px;
  background-color: white;
  position: fixed;
  width: 100%;
  max-width:1200px;
  background-color: white;
  z-index: 5;
  margin-top:90px;
  margin-bottom:1rem;

.btn-filter{
    font-size: 0.88rem;
    margin-right: 5px;
  }
@media (max-width: 780px){
  .member-filter {
    max-width: 100vw;
    padding: 1px;
    flex-wrap: wrap;
    z-index: 0 !important;
    position: relative;
  }
  .btn-filter {
    padding: 5px 1px;
  }
}
@media (min-width: 780px){
margin-right: 20px;
  // .member-filter {
  // z-index: 9;
  // }
}
  .btn-apply{
    color: $clr1;
    background-color:none;
    border:none;
    font-size: 0.75rem;
    display:inline-block;
    margin-top:1rem;
    &:hover{
      text-decoration: underline;
    }
  }

.filter-section{
   &.active{
    .btn-filter{
      background-color:$clr1;
      color: white;
    }
    .filter-details-wrapper{
        display: block;
      }
  }  
}
.filter-details-wrapper{
    display: none;
}
.filter-details{
    position: absolute ;
    top: 10px ;
    left: 0px ;
    z-index: 10 !important;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 14px 36px 2px !important;
    overflow-y: auto !important;
    overflow-x: hidden !important;
    white-space: normal !important;
    display: inline-block !important;
    max-height: calc(100vh - 152px) !important;
    visibility: visible !important;
    background: rgb(255, 255, 255) !important;
    border-width: 1px !important;
    border-style: solid !important;
    border-color: rgba(0, 0, 0, 0.2) !important;
    border-image: initial !important;
    border-radius: 4px !important;
    padding: 24px !important;
    width:300px;
}

  .hamburger{
    position: fixed;
    left: 3px;
  }
}

.age-filter {
  width: 200px;
}

.filter-screen{
  height:100vh;
  width:100vw;
  background: $bg-color;
  opacity:0.8;
  position: absolute;
  top: 0;  
  z-index:9;
  display: none;
  &.show{
    display: block;
  }
}
</style>
