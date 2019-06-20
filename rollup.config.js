import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default [
	{
		input: 'src/JSONFromFile.js',
		output: {
			file: 'lib/JSONFromFile.js',
			format: 'esm', // 
		},
		plugins: [
			resolve({
				preferBuiltins: true,
			}), // tells Rollup how to find XX in node_modules
			commonjs(), // converts XX to ES modules
			production && terser() // minify, but only in production
		],
		external: [ 'fs' ],
	},
	{
		input: 'src/getData.js',
		output: {
			file: 'lib/getData.js',
			format: 'esm', // 
		},
		plugins: [
			resolve({
				preferBuiltins: true,
			}), // tells Rollup how to find XX in node_modules
			commonjs(), // converts XX to ES modules
			production && terser() // minify, but only in production
		],
		external: [ 'fs', 'net', 'events', './JSONFromFile.js' ],
	},
	{
		input: 'src/VPLC.js',
		output: {
			file: 'lib/VPLC.js',
			format: 'esm', // 
		},
		plugins: [
			resolve({
				preferBuiltins: true,
			}), // tells Rollup how to find XX in node_modules
			commonjs(), // converts XX to ES modules
			production && terser() // minify, but only in production
		],
		external: [ 'events', 'util', './getData.js', './JSONFromFile.js', './node_snap7.node' ],
	},
];
