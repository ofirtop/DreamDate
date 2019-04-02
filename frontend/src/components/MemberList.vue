<template>
  <section class="member-list">
    <ul class="flex content-center">
      <li class="member" v-for="member in members" :member="member" :key="member._id">
        <member-preview
          @notLike="$emit('notLike', $event)"
          :member="member"
          @like="$emit('like', $event)"
          @chat="$emit('chat', $event)" />
      </li>
    </ul>
  </section>
</template>
<script>
import memberService from "../services/member.service";
import memberPreview from "./MemberPreview";
export default {
  props:['members'],
  // computed: {
    // members() {
    //   return this.$store.getters.members;
    // }
  // },
  components: {
    memberPreview
  }
};
</script>
<style scoped>
.member-list {
  margin-top: 165px;
}
.member-list ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-gap: 50px;
  position: relative;
  /* top: 9rem; */
}
</style>