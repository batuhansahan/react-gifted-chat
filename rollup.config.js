import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import fs from 'fs';


const pkg = JSON.parse(fs.readFileSync('./package.json'));


const external = Object.keys(pkg.dependencies || {});
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
  },
  // All the used libs needs to be here
  external: [
    ...external,
    'prop-types',
    'react-native',
    'moment/min/moment-with-locales.min',
  ],
  plugins: [
    resolve(),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: 'node_modules/**',
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }),
    postcss({
      plugins: [],
    }),
  ],
};
