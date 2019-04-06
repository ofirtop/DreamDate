<template>
  <section v-if="member" class="member-details">
    <div class="container">
      <div class="top-block flex">
        <div class="block-1 member-img" :style="{backgroundImage: `url(${mainImg})`}"></div>
        <div class="block-2 flex flex-column">
          <div class="block-2-1 member-img" @click="changeMainImg(imgs[0], 0)" :style="{backgroundImage: `url(${imgs[0]})`}"></div>
          <div class="block-2-2 member-img" @click="changeMainImg(imgs[1], 1)" :style="{backgroundImage: `url(${imgs[1]})`}"></div>
        </div>
        <div class="block-3 flex flex-column">
          <div class="block-3-1 member-img" @click="changeMainImg(imgs[2], 2)" :style="{backgroundImage: `url(${imgs[2]})`}"></div>
          <div class="block-3-2 member-img" @click="changeMainImg(imgs[3], 3)" :style="{backgroundImage: `url(${imgs[3]})`}" ></div>
        </div>
      </div>
      <div class="main-section">
        <div class="info full-width">
          <div class="name-section flex items-center space-between">
            <p><span>{{member.name}}, {{memberAge}}</span>
            <span v-if="member.online" class="online-status" title="Online" />
            </p>
            <div class="actions-wrapper flex space-between">
              <div v-if="!isMatch" @click.stop="addLike" class="btn-round">
                <font-awesome-icon icon="heart" class="heart" />
              </div>
              <div v-if="isMatch" @click="$emit('chat', member)" class="btn-round btn-chat">
                <font-awesome-icon icon="comment" title="Click to start chat"/>
              </div>
              <div v-if="!isMatch" @click.stop="$emit('notLike', member._id)" class="btn-round">
                <font-awesome-icon icon="times" class="not-like" />
              </div>
            </div>
          </div>
          <div class="details flex">
              <!-- <h2>{{member.name}}'s details</h2> -->
              <p class="descr">{{member.descr}}</p>
            <div class="member-info">
              <hr>
              <p class="info-tag">Height: {{member.height}}cm</p>
              <p class="info-tag">I'm from {{member.city}}</p>
              <p class="info-tag">I'm {{member.maritalStatus}}</p>
              <p class="info-tag">{{childrenInfo}}</p>
              <!-- <hr> -->
            </div>
            <div class="partner-info flex items-center">
              <h2 class="mr-1">I want to meet:</h2> 
              <p class="info-tag">{{partnerGenderNAge}}</p>
            </div>
          </div>
      </div>
      <!-- <div class="main-img">
        <div class="mainImg" :style="{backgroundImage: `url(${mainImg})`}"></div>
        <div class="actions-wrapper flex space-around">
          <div v-if="!isMatch" @click.stop="addLike">
            <font-awesome-icon icon="heart" class="heart" />
          </div>
          <div v-if="isMatch" @click="$emit('chat', member)" class="btn-chat">
            <font-awesome-icon icon="comment" title="Click to start chat"/>
          </div>
          <div v-if="!isMatch" @click.stop="$emit('notLike', member._id)">
            <font-awesome-icon icon="times" class="not-like" />
          </div>
        </div>
      </div> -->
    </div>
    <!-- <div class="img-gallery">
        <div class="member-img clickable" 
            :style="{backgroundImage: `url(${img})`}" 
            v-for="(img, idx) in imgs" :key="idx" 
            @click="changeMainImg(img, idx)">
        </div>
    </div> -->
   </div>   
  </section>
</template>
<script>
import { EVENT_BUS, EV_START_CHAT } from "@/event-bus.js";
export default {
  name: "member-details",
  data() {
    return {
      //member: null,
      mainImg:'',
      imgs:[]
    };
  },
  methods: {
    changeMainImg(imgSrc, idx) {
      let img = this.mainImg;
      this.mainImg = imgSrc;
      this.imgs.splice(idx, 1, img);
    },
    addLike() {
      if(this.member.likes.likeMe) {
        this.$store.dispatch({ type:"addMatch",member:this.member })  
      }
      this.$store.dispatch({ type: "addLikeToMember", member:this.member });
    },
    notLike() {
      this.$emit('notLike', this.member._id);
      this.$router.push('/')
    }
  },
  watch:{
    member(){
      this.mainImg = this.member.mainImage;
      this.imgs = this.member.images.slice();
    }
  },
  computed: {
    member(){
      return this.$store.getters.currMember;
    },
    memberAge() {
      let year = +this.member.dateOfBirth.substring(0, 4);
      return new Date().getFullYear() - year;
    },
    childrenInfo() {
      if (!this.member.numOfChildren) return `I don't have kids`;
      if (this.member.numOfChildren === 1) return `I have 1 child`;
      else return `I have ${this.member.numOfChildren} kids`;
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
    },
    likeStatus() {
      if (this.member.likes) {
        if (this.member.likes.likeMe && this.member.likes.iLike)
          return "YA'! You Found a Match";
        if (!this.member.likes.likeMe && !this.member.likes.iLike)
          return `Click to like ${this.member.name}`;
        if (this.member.likes.likeMe) return `${this.member.name} likes you`;
        if (this.member.likes.iLike) return `You like  ${this.member.name}`;
      }
    },
    isMatch() {
      return this.member.likes.likeMe && this.member.likes.iLike;
    }
  },
  async created() {
    let memberId = this.$route.params.userId;
    await this.$store.dispatch({ type: "loadMemberById", memberId });
    this.$store.dispatch({type: 'watchMember', memberId});  
  }
};
</script>
<style scoped lang="scss">
  @import '../sass/_variables.scss';
.top-block {
  width: 100%;
  height: 300px;
}
.block-1 {
  background-color: rgb(220, 207, 207);
  width: 50%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}
.block-2,
.block-3 {
  width: 25%;
  height: 100%;
}
.block-2-1,
.block-3-1 {
  background-color: rgb(220, 207, 207);
  height: 50%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
}
.block-2-2,
.block-3-2 {
  background-color: rgb(220, 207, 207);
  height: 50%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover
}
p {
  margin: 5px 0;
}
a {
  text-decoration: none;
  color: black;
}
.name-section {
    margin: 0px !important;
    word-wrap: break-word !important;
    font-size: 32px !important;
    font-weight: 800 !important;
    line-height: 1.125em !important;
    color: #484848 !important;
    padding-top: 6px !important;
    padding-bottom: 6px !important;
}
// .info-tag {
//   border-radius: 7px;
//   background-color: rgba(214, 211, 211, 0.493);
//   border: 1px solid #48484877;
//   color: #484848;
//   padding: 2px 3px;
//   margin-right: 5px;
//   font-size: 16px;
//   font-weight: 400;
//   line-height: 1.375em;
//   color: #484848;
// }
.member-details {
  position: relative;
  margin-top: 75px;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
}
.descr {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.375em;
    color: #484848;
}
.partner-info h2 {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.375em;
    color: #484848;
}
.container {
  // max-width: 60%;
  width: 1180px;
  // padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(248, 248, 248, 1);
  border-radius: 2px;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.main-section {
  display: flex;
  justify-content: space-around;
  margin: 10px;
  width: 750px;
  margin: 24px 8px;
  padding: 0 8px;
}
.details {
  flex-direction: column;
  align-items: flex-start;
  color: #484848;
}
.member-img {
  background-position: center center;
}
h1 {
  font-size: 22px;
  font-weight: 400;
}
  .actions-wrapper{
    // margin-right: 70px;
    width: 120px;
  }
  .heart{
    transform: translateY(-5px);
  }
  .not-like{
    transform: translateY(-6px);
  }
.online-status {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  &.on {
    background-color: darken($clr1, 10%);
    border-color:darken($clr1, 10%);
    box-shadow: 0px 0px 4px 1px darken($clr1, 10%);
  }
  &.off {
    background-color: $clr11;
    border-color: $clr11;
    box-shadow: 0px 0px 4px 1px $clr11;
  }
}
.my-heart {
  &.on {
    color: rgb(59, 193, 197);
  }
  &.off {
    color: lightgray;
  }
}
.member-heart {
  margin-left: -7px;
  &.on {
    color: #8b368b;
  }
  &.off {
    color: lightgray;
  }
}
.btn-round.btn-chat{
  line-height: 48px;
}
.notLike {
  color: lightgray;
}
 @media (max-width: 800px) {
    .container {
      flex-direction: column-reverse;
      width: 100%;
      max-width: unset;
    }
    .main-section {
      width: 100%;
      margin: 5px 0;
    }
    .mainImg {
      width: 100%;
    }
    .top-block {
      flex-direction: column;
      height: 100%
    }
    .block-1,
    .block-2,
    .block-3 {
      width:100%
    }
    .block-1,
    .block-2 >*,
    .block-3>* {
      height: 500px;
    }
    .member-img {
    width: 100%;
    height: 80vh;
    margin: 0;
    background-position: center center
    }
    .details {
      width: 95%;
      max-width: unset;
      margin:0;
    }
    // .img-gallery {
    //   flex-direction: column;
    //   width: 100%;
    // }
}
</style>