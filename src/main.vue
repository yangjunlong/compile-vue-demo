<!--
 * main.vue
 * 
 * @author  Yang,junlong at 2018-09-12 10:56:20 build.
 * @version $Id$
-->

<template>
  <div>
    <h1>{{ name }}</h1>
    <el-button @click="handleClick">默认按钮</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return { name: 'main' };
  },
  methods: {
    handleClick(e) {
      console.log(e);
      alert(this.name);
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  color: red;
  display: flex;
  flex: 1;
  .test {
    color: green;
  }
}
</style>
