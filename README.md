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
为此Vue的官方提供了`vue-loader`，它会解析文件，提取每个语言块，如有必要会通过其它 loader 处理，最后将他们组装成一个 ES Module，它的默认导出是一个 Vue.js 组件选项的对象。

`vue-loader` 支持使用非默认语言，比如 CSS 预处理器，预编译的 HTML 模版语言，通过设置语言块的 lang 属性。例如，你可以像下面这样使用 Sass 语法编写样式：

```sass
<style lang="sass">
  /* write Sass! */
</style>
```
详情见[https://vue-loader.vuejs.org/zh/](https://vue-loader.vuejs.org/zh/)

### 开始
大部分情况下我们开发Vue项目是通过vue-cli这个脚手架快速生成一个项目骨架而开始的
```
vue init webpack my-vue-project
```
然后我们在这个项目中编写.vue单文件组件，通过：
```
npm rub build 
```
构建整个项目，将产出的文件发布上线，事实上在整个项目构建过程中我们并不知道.vue文件到底发生了什么。当然如果只是单纯通过这种方式来开发一个Vue的单页项目，其实也并不需要了解太多细节，我们只需要按照给定的项目规范编写业务代码即可，但这种傻瓜式的开发配置，有时候并不能满足多变的需求。

### 想法
既然Vue官方已经定义了一种单文件组件(SFC)规范的东东，我们何不借来使用：实现组件的平台化。我们提供一个.vue组件编辑器供用户使用，编辑完成后单击保存，即可看到该组件渲染之后的页面。

在这个过程中会涉及到如何编译.vue单文件组件，以及动态/异步渲染vue单文件组件，本文主要记录编译vue单文件组件的两种方法：（假设您已了解`webpack`和`fis3`的使用）

在开始之前我们提前创建了一个项目：[compile-vue-demo](https://github.com/yangjunlong/compile-vue-demo)，方便您的调试和查看，该项目集成了webpack和fis3两种编译方式。

### webpack
项目里的`entry.webpack.html`文件为webpack编译方式的入口文件，通过运行下面的命令来编译
```shell
webpack
```

```javascript
// webpack.config.js
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: './src/hello.vue',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    library: 'hello',
    //libraryTarget: 'umd'
  },
  mode: 'development',
  devtool: 'none',
  module: {
    rules: [
      // 解析.vue文件
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        loader: 'css-loader'
      },
      // 它会应用到普通的 `.js` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
```

上面的配置就是将`./src/hello.vue`文件编译打包成 `./dist/bundle.js`文件，为了能够在打包之后拿到`hello.vue`组件对象，上面配置了`output.library = 'hello'`

在`entry.webpack.html`文件中则通过下面方式实例化了一个Vue App

```javascript
var vm = new Vue({
  el:'#app',
  data: {
    hello: 'hello'
  },
  created() {},
  components:{
    hello: hello.default
  }
});
```

### FIS3
项目里的`entry.fis.html`文件为fis编译方式的入口文件，通过运行下面命令来查看效果：

```
fis3 server start
fis3 release -wcL
```
本地访问：http://127.0.0.1:8080/entry.fis.html

在fis中已经有大神帮我们实现了.vue文件的编译插件：[fis3-parser-vue-component](https://github.com/ccqgithub/fis3-parser-vue-component) 具体配置如下

```javascript
// fis-conf.js
fis.match('*.vue', {
  isMod: true,
  rExt: '.js',
  useSameNameRequire: true,
  parser: fis.plugin('vue-component', {
    runtimeOnly: true, // vue@2.x 有润timeOnly模式，为ture时，template会在构建时转为render方法， 这里开启后paths中无需指定
    // styleNameJoin
    styleNameJoin: '', // 样式文件命名连接符 `component-xx-a.css`
    extractCSS: false, // 是否将css生成新的文件, 如果为false, 则会内联到js中
    // css scoped
    cssScopedIdPrefix: '_v-', // hash前缀：_v-23j232jj
    cssScopedHashType: 'sum', // hash生成模式，num：使用`hash-sum`, md5: 使用`fis.util.md5`
    cssScopedHashLength: 8 // hash 长度，cssScopedHashType为md5时有效
  }),
  optimizer: [/*fis.plugin('uglify-js'),*/ function(content, file, settings) {
    //console.log(file);
    return content;
  }]
}).match('{*.less, *.vue:less}', {
  parser: fis.plugin('less'),
  postprocessor: fis.plugin('autoprefixer'),
  rExt: '.css'
}).match('{src/**.js, *.vue:js}', {
  parser: fis.plugin('babel-6.x', {
    presets: ['es2015', 'stage-3'],
    plugins: ['add-module-exports']
  }),
  rExt: '.js'
});
```

### 平台化？
上面的两种编译.vue的方法，也只是我们借助工具经过简单配置来实现的，尽管实现了.vue单文件组件的编译，但还是不够友好，或者说我们还是不能方便的使用，他们仍然是要通过编译文件的形式来解析代码，是否可以以一种服务的形式存在直接解析/编译从前端编辑器POST过来的.vue单文件组件代码？我们后面文章将继续介绍~~
