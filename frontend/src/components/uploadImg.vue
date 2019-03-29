
<template>
    <section class="upload-img flex">
        <form class="publish-form" action="" method="POST" enctype="multipart/form-data" 
                onsubmit="uploadImg($this, event)">
            <div><input :newImg="newImg" type="file" name="img" /></div>
            <div><button type="submit" class="btn">Submit</button></div>    
        </form>
    </section>
</template>
<script>
import cloudinaryService from '../services/cloudinaryService';
export default {
      props: ['profile'],
  data() {
    return {
        user: null,
        newImg: null
    }
  },
  methods: {
    //   uploadImg(this, event) {
    //       console.log(this);

    //   }
  },
  created() {
    this.user = this.profile;
  }
}
</script>
<style scoped>
.upload-img {
    height: 200px;
    position: fixed;
    top: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10;
    background-color: rgba(248, 248, 248, 1);
}
</style>

