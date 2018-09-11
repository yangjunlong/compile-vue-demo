# 编译vue单文件组件

>> Vue官方定义了一种名叫单文件组件(SFC)规范的*.vue文件，用类 HTML 语法描述一个 Vue 组件。每个 .vue 文件包含三种类型的顶级语言块 <template>、<script> 和 <style>，还允许添加可选的自定义块：

```html
<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
</style>

<custom1>
  This could be e.g. documentation for the component.
</custom1>
```