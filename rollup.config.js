import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
    // tell rollup our main entry point
    entry: 'src/datab.js',
    dest: 'dist/datab.rollup-bundle.js',
    // format: 'iife',
    format: "umd",
    moduleName: 'datab',
    // external:['d3'],
    // external: id => /d3/.test(id),
    plugins: [
	json(),
	resolve(),
	babel({
	    exclude: 'node_modules/**'
	}),
	uglify()
    ]
}
