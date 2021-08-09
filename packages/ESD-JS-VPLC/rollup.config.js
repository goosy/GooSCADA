import pkg from './package.json';
import { writeFile } from 'fs/promises';
import { builtinModules } from 'module';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy'
import { terser } from 'rollup-plugin-terser';

const production = process.env.VPLC == "production";
export default {
	input: ['./index.js'],
	output: {
		file: pkg["exports"]["."],
		format: 'es',
	},
	plugins: [
		resolve({ preferBuiltins: true }), // tells Rollup how to find XX in node_modules
		production && terser(), // minify, but only in production
		copy({
			targets: [{
				src: 'commands/*',
				dest: 'dist/'
			}, {
				src: 'assets',
				dest: 'dist/'
			}, {
				src: 'conf',
				dest: 'dist/'
			},]
		}),
	],
	external: [
		...builtinModules,
		'goovplc',
		'goohmi',
		'node-snap7',
		/.*\/conf\/config.js/,
		/.*\/conf\/connections.js/,
	],
};

// ./dist/package.json
writeFile('./dist/package.json', JSON.stringify({
	...pkg,
	"main": "./app.js",
	"exports": {
		".": "./app.js"
	},
	"dependencies": {
		"goovplc": "^0.7.4"
	},
	"devDependencies": {},
	"scripts": {
		"start": "node ./app.js",
	},
}, null, 4)).catch(err => {
	console.error("./dist not exist. pls try again.");
});