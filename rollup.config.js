import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  // tell rollup our main entry point
    entry: 'src/datab.js',
    dest: 'dist/datab.rollup-bundle.js',
    format: 'iife',
    moduleName: 'datab',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ]
}
