
<template>
    <section class="upload-img clickable items-center flex">
      <div class="screen" v-if="isImgReady"></div>
      <label for="takePic" class="input-img flex items-center content-center" title="take a picture"> 
          <i class="el-icon-plus clickable"></i>
          <i class="el-icon-upload btn-mobile clickable hidden"></i>
          <input id="takePic" type="file" name="img" @change="previewFiles" accept="image/*;capture" style="display:none"/>
      </label>
        <div v-if="isImgReady" class="preview flex items-center content-center">
          <i class="el-icon-close close" @click.stop="close"></i>
          <div class="flex">
            <div class="preview-img" :style="{backgroundImage: `url(${newImg})`}"></div>
          </div>
          <div class="rotate flex">
            <img class="left" src="../assets/img/rotate-left.png" @click.stop="rotateLeft">
            <img class="right" src="../assets/img/rotate-right.png" @click.stop="rotateRight">
          </div>
          <el-button type="success" @click.stop="saveImg" plain>Add image</el-button>
        </div>
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
        isImgReady: false,
    }
  },
  methods: {
    async previewFiles(event) {
        this.file = event.target.files[0];
        this.newImg = await cloudinaryService.uploadImg(this.file, event);
        this.isImgReady = true;
    },
    saveImg(){
      if(!this.user.mainImage) this.user.mainImage = this.newImg;
      else this.user.images.push(this.newImg);
      this.$emit('addChanges', this.user);
      this.isImgReady = false;
    },
    rotateRight(){
      let strToAdd= '/a_90'
      let url = this.newImg;
      let idx = url.indexOf('upload');
      this.newImg = url.slice(0, idx+6) + strToAdd + url.slice(idx+6);
      this.isImgReady = true;
    },
    rotateLeft(){
      let strToAdd= '/a_-90'
      let url = this.newImg;
      let idx = url.indexOf('upload');
      this.newImg = url.slice(0, idx+6) + strToAdd + url.slice(idx+6);
      this.isImgReady = true;
    },
    close() {
      this.isImgReady = false;
    }
  },
  created() {
   this.user = JSON.parse(JSON.stringify(this.profile));
  }
}
</script>
<style scoped>
.input-img {
  cursor: pointer;
  padding: 10px;
  width: 150px;
  height: 150px;
  color: gray;
  font-size: 2em;
  border: 2px dashed gray;
}

.preview {
  background-color: white;
  position: absolute;
  top: 10%;
  left: 30%;
  flex-direction: column;
  z-index: 4;
  /* width: 40vw; */
}
.preview-img {
  width: 400px;
  min-height: 300px;
  background-size: contain;
  background-position: top center;
  background-repeat: no-repeat;
  margin: 10px;
}
.close{
  cursor: pointer;
  font-size: 1.5em;
  align-self: flex-end;
}
.el-button {
  margin-bottom: 10px;
}

.rotate>* {
  width:30px;
  height:30px;
  cursor:pointer;
  margin: 10px;
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
@media (max-width: 740px) {
  .upload-img {
    height: 100%;
  }
  .input-img {
    padding: 0;
    width: 100%;
    height: 64px;
    border: none;
  }
  .btn-mobile {
  display: inline-block;
  font-size: 64px;
  color:gray
  }
  .el-icon-plus {
    display: none;
  }
  .preview {
    width: 100%;
    top:0;
    left:0
  }
  .close{
    font-size: 1em;
  }
}
</style>

