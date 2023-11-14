import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import html, {makeHtmlAttributes} from '@rollup/plugin-html';
import vue from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from 'rollup-plugin-replace';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const defaultTemplate = async ({ attributes, files, meta, publicPath, title }) => {
  const scripts = (files.js || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.script);
      return `<script src="${publicPath}${fileName}"${attrs}></script>`;
    })
    .join('\n');
  const links = (files.css || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.link);
      return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
    })
    .join('\n');
  const metas = meta
    .map((input) => {
      const attrs = makeHtmlAttributes(input);
      return `<meta${attrs}>`;
    })
    .join('\n');
  return `
<!doctype html>
<html${makeHtmlAttributes(attributes.html)}>
<head>
  ${metas}
  <title>${title}</title>
  ${links}
</head>
<body>
  <div id="app"></div>
  ${scripts}
</body>
</html>`;
};

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/rollup.js',
    format: 'umd',
  },
  plugins: [
    nodeResolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        isProduction ? 'production' : 'development'
      )
    }),
    vue(/* VuePluginOptions */),
    postcss( {
      extract: true,
      minimize: isProduction,
      // plugins: [] // @see postcss.config.js
    }),
    html({
      fileName: 'rollup.html',
      template: defaultTemplate,
    }),
  ],
};