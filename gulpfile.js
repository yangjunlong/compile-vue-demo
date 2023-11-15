/**
 * gulpfile.js
 * 
 * sobird<i@sobird.me> at 2023/09/30 16:02:42 created.
 */

import gulp from 'gulp';
const { src, dest, parallel, series, watch } = gulp;

import gulpPluginVue from 'gulp-plugin-vue';

module.exports.vue = function () {
  return src('./src/*.vue')
    .pipe(gulpPluginVue())
    .pipe(dest('output'));
};

function transpile(cb) {
  // body omitted
  cb();
}

function bundle(cb) {
  // body omitted
  cb();
}

export default series(transpile, bundle);
