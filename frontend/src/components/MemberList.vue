<template>
  <section class="member-list">
    <!-- <h1>Members list</h1> -->
      <ul class="flex content-center">
       <li class="member" v-for="member in members" :member="member" :key="member._id">
            <member-preview @notLike="$emit('notLike', $event)" :member="member" @like="$emit('like', $event)"></member-preview>
        </li>
      </ul>
  </section>
</template>
<script>
import memberService from '../services/member.service'
import memberPreview from './MemberPreview'
export default {
    data() {
        return {

        }
    },
    computed: {
      members() {
        return this.$store.getters.members;
      }
    },
    components: {
      memberPreview
    }
};
</script>
<style scoped>
  .member-list ul{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>