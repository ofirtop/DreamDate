
<template>
    <section class="upload-img flex">
      <div class="top">
        <h1>Add new picture</h1>
        <i class="el-icon-close close" @click.stop="$emit('close')"></i>
      </div>
        <form class="publish-form" action="" enctype="multipart/form-data" @submit.prevent="previewFiles(event)">
            <label for="uploadPic" class="input-img" title="upload from your device">
              <input id="uploadPic" type="file" name="img" @change="previewFiles" multiple style="display:none"/>
              <i class="el-icon-upload"></i>
            </label>
            <label for="takePic" class="input-img" title="take a picture">
              <input id="takePic" type="file" name="img" @change="previewFiles" accept="image/*;capture" style="display:none"/>
              <i class="el-icon-mobile-phone"></i>
            </label>
        </form>
        <div class="preview" :style="{backgroundImage: `url(${newImg})`}"></div>
        <div class="rotate flex" v-if="saveImgBtn">
          <img class="left" src="../assets/img/rotate-left.png" @click.stop="rotateLeft">
          <img class="right" src="../assets/img/rotate-right.png" @click.stop="rotateRight">
        </div>
        <el-button v-if="saveImgBtn" type="success" @click.stop="saveImg" plain>Save</el-button>
        
    </section>
</template>
<script>
import cloudinaryService from '../services/cloudinaryService';
export default {
      props: ['profile'],
  data() {
    return {
        user: null,
        file: null,
        newImg: null,
        saveImgBtn: false,
    }
  },
  methods: {
    async previewFiles(event) {
        this.file = event.target.files[0];
        console.log('file:', this.file, 'event', event);
        let img = await cloudinaryService.uploadImg(this.file, event);
        this.newImg = img;
        this.saveImgBtn = true;
    },
    saveImg(){
      if(!this.user.mainImage) this.user.mainImage = this.newImg;
      else this.user.images.push(this.newImg);
      this.$emit('addChanges', this.user);
      this.saveImgBtn = false;
    },
    rotateRight(){
      let strToAdd= '/a_90'
      let url = this.newImg;
      let idx = url.indexOf('upload');
      url = url.slice(0, idx+6) + strToAdd + url.slice(idx+6);
      this.newImg = url;
      this.saveImgBtn = true;
    },
    rotateLeft(){
      let strToAdd= '/a_-90'
      let url = this.newImg;
      let idx = url.indexOf('upload');
      url = url.slice(0, idx+6) + strToAdd + url.slice(idx+6);
      this.newImg = url;
      this.saveImgBtn = true;
    }
  },
  created() {
    console.log('created, user:', this.profile);
    this.user = this.profile;
  }
}
</script>
<style scoped>
.upload-img {
    position: fixed;
    width: 300px;
    top: 20%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    z-index: 10;
    background-color: rgba(248, 248, 248, 1);
}
.preview {
  width: 200px;
  height: 200px;
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  margin: 10px;
}
.close{
  cursor: pointer;
}
.input-img {
  background-color: #8b368b;
  color: white;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
}
form {
  margin: 10px;
  padding: 5px;
  top: 30px;
  
}
form >* {
  margin: 10px;
}
.top {
  width: 100%;
  font-size: 2em;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  margin: 10px 5px;
}
.el-button {
  margin: 10px;
}
.rotate>* {
  width:30px;
  height:30px;
  cursor:pointer;
  margin: 10px;
}
</style>

