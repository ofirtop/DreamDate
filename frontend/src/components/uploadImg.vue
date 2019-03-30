
<template>
    <section class="upload-img flex">
      <div class="top">
        <!-- <h1>Add new picture</h1> -->
        <i class="el-icon-close close" @click.stop="$emit('close')"></i>
      </div>
        <form class="publish-form" action="" enctype="multipart/form-data" @submit.prevent="previewFiles(event)">
            <label for="uploadPic" class="input-img">
              <input id="uploadPic" type="file" name="img" @change="previewFiles" multiple style="display:none"/>
              Upload Picture
            </label>

        </form>
        <div class="preview" :style="{backgroundImage: `url(${newImg})`}"></div>
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
        newImg: null,
        saveImgBtn: false
    }
  },
// <form class="publish-form" action="" method="POST" enctype="multipart/form-data" 
  methods: {
    async previewFiles(event) {
        let file =event.target.files[0];
        console.log('file:', file, 'event', event);
        let img = await cloudinaryService.uploadImg(file, event);
        this.newImg = img;
        this.saveImgBtn = true;
    },
    saveImg(){
      if(!this.user.mainImage) this.user.mainImage = this.newImg;
      else this.user.images.push(this.newImg);
      this.$emit('addChanges', this.user);
      this.saveImgBtn = false;
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
  width: 250px;
  height: 250px;
  background-size: contain;
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
.top {
  width: 100%;
  font-size: 2em;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
}
.el-button {
  margin: 10px;
}
</style>

