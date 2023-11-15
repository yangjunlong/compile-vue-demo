<script setup>
import { ref } from 'vue';
const count = ref(0);
</script>

<template>
  <button @click="count++">Count is: <span>{{ count }}</span></button>
</template>

<style lang="scss" scoped>
button {
  font-weight: bold;
  flex: 1;
  span {
    color: red;
  }
}
</style>