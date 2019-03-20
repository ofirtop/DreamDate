<template>
  <section class="member-list">
    <!-- <h1>Members list</h1> -->
      <ul>
       <li class="member" v-for="member in members" :member="member" :key="member._id">
            <member-preview :member="member" @like="$emit('like', $event)"></member-preview>
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
    created() {
      this.$store.dispatch({ type: 'loadMembers'})
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
  }
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: inherit
  }
</style>



