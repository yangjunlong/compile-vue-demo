<!--
 * hello.vue
 * 
 * @author  Yang,junlong at 2018-09-10 16:16:58 build.
 * @version $Id$
-->

<template>
  <div>
    <h1>{{text}}</h1>
    <Test />
  </div>
</template>

<script>
import Test from './test.vue';
export default {
  name:'hello',
  components: {
    Test
  },
  data:function() {
    return  {
      text:'hello'
    };
  },

  created() {
    //
  }
};
</script>

<style scoped>
  h1 {
    color: red;
  }
</style>