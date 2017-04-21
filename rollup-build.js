import { rollup } from 'rollup';

import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

rollup({
  // tell rollup our main entry point
  entry: 'src/datab.js',
  plugins: [
    // configure rollup-babel to use the ES2015 Rollup preset
	// and not transpile any node_modules files
    babel({
      exclude: 'node_modules/**',
      presets: 'es2015-rollup'
    }),
	// minify with uglify
	uglify()
  ]
}).then((bundle) => {
  // write bundle to a file and use the IIFE format so it executes immediately
  return bundle.write({
    format: 'iife',
    dest: 'dist/datab.rollup-bundle.js'
  });
}).then(() => {
  console.log('Bundle created');
});
