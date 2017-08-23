import path from 'path';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json';

const filter = arr => arr.filter(x => !!x);
const argv = process.argv.slice(2);
const isProduction = !argv.includes('--watch') && !argv.includes('-w');

const main = pkg.main;
const extname = path.extname(pkg.main);

const defaultPlugins = filter([
  commonjs(),
  babel({
    exclude: 'node_modules/**',
    plugins: ['external-helpers'],
  }),
  isProduction && filesize(),
]);

const configuration = ({ format, dest, plugins = defaultPlugins } = {}) => ({
  input: 'src/index.js',
  output: {
    file: dest,
    name: 'ReactInfiniteScrollList',
    format,
  },
  external: ['react', 'prop-types'],
  globals: {
    react: 'React',
    'prop-types': 'PropTypes',
  },
  plugins,
});

export default filter([
  configuration({ format: 'es', dest: pkg.module }),
  isProduction && configuration({ format: 'umd', dest: main }),
  isProduction &&
    configuration({
      format: 'umd',
      dest: `${main.substring(0, main.length - extname.length)}.min${extname}`,
      plugins: defaultPlugins.concat([
        uglify({
          compress: {
            warnings: false,
            comparisons: false,
          },
          output: {
            comments: false,
            ascii_only: true,
          },
        }),
      ]),
    }),
]);
