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
        <div class="details flex">
          <hr>
          <!-- <h2>{{member.name}}'s details</h2> -->
          <p>{{member.descr}}</p>
          <hr>
          <p>Height: {{member.height}}cm</p>
          <p>I'm from {{member.city}}</p>
          <p>I'm {{member.maritalStatus}}</p>
          <p>I have {{childrenInfo}}</p>
          <hr>
          <h2>I want to meet:</h2>
          <p>{{partnerGenderNAge}}</p>
        </div>
      </div>
      <div class="main-img">
        <div class="mainImg" :style="{backgroundImage: `url(${mainImg})`}"></div>
        <div class="actions-wrapper flex space-around">
          <div v-if="!isMatch" @click.stop="$emit('like', member)">
            <font-awesome-icon icon="heart" class="heart" />
          </div>
          <div v-if="isMatch" @click="$emit('chat', member)" class="btn-chat">
            <font-awesome-icon icon="comment" title="Click to start chat"/>
          </div>
          <div v-if="!isMatch" @click.stop="$emit('notLike', member._id)">
            <font-awesome-icon icon="times" class="not-like" />
          </div>
        </div>
        <!-- <div class="actions-wrapper">
          <span class="like-status" :title="likeStatus" @click.stop="$emit('like', member)">
          <font-awesome-icon
            class="heart my-heart"
            icon="heart"
            :class="{on: this.member.likes.iLike, off: !this.member.likes.iLike}"
          /> -->
          <!-- <font-awesome-icon
            class="heart member-heart"
            icon="heart"
            :class="{on: this.member.likes.likeMe, off: !this.member.likes.likeMe}"
          />
          </span>
          <div v-if="isMatch" @click="$emit('chat', member)" class="btn-chat">
            <font-awesome-icon icon="comment" title="Click to start chat"/>
          </div>
          <div>
          <font-awesome-icon
            class="notLike"
            icon="times"
            @click.stop="notLike"
            title="Click to remove"
            />
          </div>
        </div> -->
        <!-- <div class="likes-panel clickable">
            <font-awesome-icon class="like" icon="heart" @click.stop="like"/>
            <font-awesome-icon class="notLike" icon="times" @click.stop="notLike"/>
        </div> -->
      </div>
    </div>
    <div class="img-gallery">
        <div class="member-img clickable" 
            :style="{backgroundImage: `url(${img})`}" 
            v-for="(img, idx) in imgs" :key="idx" 
            @click="changeMainImg(img, idx)">
        </div>
    </div>
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
    // like() {
    //   this.$emit('like', this.member);
    //   this.$router.push('/')
    // },
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
p {
  margin: 5px 0;
}
a {
  text-decoration: none;
  color: black;
}
.member-details {
  position: relative;
  margin-top: 75px;
  text-align: left;
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
  margin-top: 10px;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.main-section {
  display: flex;
  justify-content: space-around;
  margin: 10px;
}
.details {
  // max-width: 50%;
  margin: 2em;
  flex-direction: column;
  align-items: flex-start;
}
.mainImg {
    width: 200px;
    height: 250px;
    background-position: center top;
    background-repeat: no-repeat;
    background-size: cover;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
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
h1 {
  font-size: 2em;
  font-weight: bold;
}
  .actions-wrapper{
    margin: 20px 0;
    & > div{
      background: linear-gradient(to bottom right,  #2c8789, $clr1);
      color: #fff;
      width: 45px;
      height: 45px;
      font-size: 1.5rem;
      line-height: 60px;
      text-align: center;
      border-radius: 30px;
      box-shadow: 0 13px 26px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.2); 
      cursor: pointer;
    }
    & > .btn-chat {
      line-height: 50px;
    }
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
.btn-chat {
  color: #8b368b;
}
.notLike {
  color: lightgray;
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
