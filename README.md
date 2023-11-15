# 编译vue单文件组件


### 背景

Vue官方定义了一种名叫单文件组件(SFC)规范的*.vue文件，用类 HTML 语法描述一个 Vue 组件。每个 .vue 文件包含三种类型的顶级语言块 `<template>`、`<script>` 和 `<style>`，还允许添加可选的自定义块：

```jsx
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
为此Vue的官方为`webpack`提供了`vue-loader`，它会解析`.vue`文件，提取每个语言块，如有必要会通过其它 loader 处理，最后将他们组装成一个 ES Module，它的默认导出是一个 `Vue.js` 组件选项的对象。

`vue-loader` 支持使用非默认语言，比如 CSS 预处理器，预编译的 HTML 模版语言，通过设置语言块的 lang 属性。例如，你可以像下面这样使用 Sass 语法编写样式：

```sass
<style lang="sass">
  /* write Sass! */
</style>
```
详情见[https://vue-loader.vuejs.org/zh/](https://vue-loader.vuejs.org/zh/)

### 开始
大部分情况下我们开发Vue项目是通过vue脚手架快速生成一个项目骨架而开始的

```sh
vue init webpack my-vue-project
```

然后我们在这个项目中编写.vue单文件组件，通过：

```
npm run build 
```

构建整个项目，将产出的文件发布上线，事实上在整个项目构建过程中我们并不知道.vue文件到底发生了什么。当然如果只是单纯通过这种方式来开发一个Vue的单页项目，其实也并不需要了解太多细节，我们只需要按照给定的项目规范编写业务代码即可，但这种傻瓜式的开发配置，有时候并不能满足多变的需求。

### 想法
既然Vue官方已经定义了一种单文件组件(SFC)规范的东东，我们何不借来使用：实现组件的平台化。我们提供一个.vue组件编辑器供用户使用，编辑完成后单击保存，即可看到该组件渲染之后的页面。

在这个过程中会涉及到如何编译.vue单文件组件，以及动态/异步渲染vue单文件组件，本文主要记录编译vue单文件组件的几种方法：

### rollup
> Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。Rollup 对代码模块使用新的标准化格式，这些标准都包含在 JavaScript 的 ES6 版本中，而不是以前的特殊解决方案，如 CommonJS 和 AMD。ES6 模块可以使你自由、无缝地使用你最喜爱的 library 中那些最有用独立函数，而你的项目不必携带其他未使用的代码。ES6 模块最终还是要由浏览器原生实现，但当前 Rollup 可以使你提前体验。


项目里的`public/rollup.html`文件为rollup编译的入口文件，通过运行下面的命令进行编译：
```
yarn build:rollup
```

### webpack

项目里的`public/index.html`文件为webpack编译方式的入口文件，通过运行下面的命令来编译:

```
yarn build:webpack
```

### gulp


### parcel

### 平台化？
上面的两种编译.vue的方法，也只是我们借助工具经过简单配置来实现的，尽管实现了.vue单文件组件的编译，但还是不够友好，或者说我们还是不能方便的使用，他们仍然是要通过编译文件的形式来解析代码，是否可以以一种服务的形式存在直接解析/编译从前端编辑器POST过来的.vue单文件组件代码？我们后面文章将继续介绍~~

