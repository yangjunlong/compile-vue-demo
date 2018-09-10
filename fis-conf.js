/**
 * fis-conf.js
 * 
 * @author  Yang,junlong at 2018-09-10 16:48:32 build.
 * @version $Id$
 */

// 排除构建
fis.set('project.ignore', [
  'output/**',
  'node_modules/**',
  '.git/**',
  '.svn/**',
  'dist/**'
]);

// 压缩js
fis.match('*.js', {
    // fis-optimizer-uglify-js 插件进行压缩，已内置
    optimizer: fis.plugin('uglify-js')
});

// 构建vue文件
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
}).match('{api/**.js, store/**.js, src/**.js, config/**.js, *.vue:js, dep/d3.js}', {
  parser: fis.plugin('babel-6.x', {
    presets: ['es2015', 'stage-3'],
    plugins: ['add-module-exports']
  }),
  rExt: '.js'
});


fis.match('{/static/js/mod.js,fis-conf.js}', {
    isMod: false
});
