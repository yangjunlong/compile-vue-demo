<!--
 * test.vue
 * 
 * @author  Yang,junlong at 2018-09-10 16:18:10 build.
 * @version $Id$
-->

<template>
	<div><el-button @click="handleClick">默认按钮</el-button></div>
</template>

<script>
  export default {
  	name: 'test',
  	methods: {
  	  handleClick() {
  	  	alert('test11');
  	  }
  	}
  }
</script>