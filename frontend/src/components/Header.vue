<template>
  <header class="app-header flex items-center">
    <nav id="nav" class="flex items-center">
      <router-link to="/">
        <img src="@/assets/img/logo.png" alt="logo" class="logo">
      </router-link>
      <div v-if="loggedInUser" class="flex items-center">
        <router-link :to="'/user/' + loggedInUser._id">
          {{loggedInUser.name}}
        </router-link>
        <button @click="$emit('logout')">Logout</button>
        <button v-if="false" @click="gotoMembersWhoWatchedMe">
          Watched me:
          <span>{{newMembersWhoWatchedMeCount}}</span>
        </button>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "app-header",
  props: ["loggedInUser"]
};
</script>

<style>
.app-header{
    position: fixed;
    background-color: white;
    top: 0;
    z-index: 9;
    width: 100%;
    height: 3rem;
}
</style>