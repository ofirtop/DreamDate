<template>
  <section>
    <h1>Match with {{member.name}}</h1>
    <button @click="$emit('chat', member)">Start Chat</button>
    <br>
    <button @click="$emit('close')">&times;</button>
  </section>
</template>

<script>
export default {
  props: ['member']
};
</script>

<style scoped lang="scss">
section {
  background-color: red;
  width:200px;
  border:2px solid lightcoral;
  padding:5px;
  position:fixed;
  top:30%;
  left: 50%;
  height: 300px;
  box-shadow: 2px 2px 20px 14px black;
}
</style>
