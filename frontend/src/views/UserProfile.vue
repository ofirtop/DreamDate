<template>
  <section v-if="member" class="member-details">
    <h1>User Details</h1>
    <router-link to="/"><h3 class="backToAll">BACK TO ALL</h3></router-link>
    <div class="img-section">
        <h1>{{member.name}}, {{memberAge}}</h1>
      <img class="mainImg" :src= member.mainImage>
      <div class="img-gallery">
        <div class="member-img" v-for="(img, idx) in member.images" :key="idx" :src="img">
          <img :src= img >
        </div>   
      </div>
    </div> 
    <div class="details-section">
          <h2>{{member.name}}'s details</h2>
          <h4>Height: {{member.height}}cm</h4>
          <h4>City: {{member.city}}</h4>
          <h4>Marital status: {{member.maritalStatus}}</h4>
          <h4>Children: {{childrenInfo}}</h4>
          <hr>
          <h2>{{member.name}} wants to meet:</h2>
          <h4>{{partnerGenderNAge}}</h4>
    <div class="likes-panel">
      <font-awesome-icon icon="heart" @click.stop="like" />
      <font-awesome-icon icon="times" @click.stop="notLike"/>
    </div>
    </div>
  </section>
</template>
<script>
export default {};
</script>