import pkg from './package.json';
import {writeFile} from 'fs/promises';

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy'
import {
	terser
} from 'rollup-plugin-terser';

const production = process.env.VPLC == "production";
const external = [
	'crypto',
	'events',
	'fs/promises',
	'http',
	'https',
	'module',
	'net',
	'stream',
	'tls',
	'util',
	'url',
	'zlib',
	'node-snap7',
	/.*\/conf\/config.js/,
	/.*\/conf\/connections.js/,
]
export default {
	input: ['./index.js'],
	output: {
		file: pkg["main"],
		format: 'es',
	},
	plugins: [
		resolve({
			preferBuiltins: true,
		}), // tells Rollup how to find XX in node_modules
		commonjs(), // converts XX to ES modules
		production && terser(), // minify, but only in production
		copy({
			targets: [{
				src: 'node_modules/goovplc/lib/node_snap7.node',
				dest: 'dist/'
			}, {
				src: 'node_modules/goovplc/lib/wscli.js',
				dest: 'dist/'
			}, {
				src: 'commands/*',
				dest: 'dist/'
			}, {
				src: 'assets',
				dest: 'dist/'
			}, {
				src: 'conf',
				dest: 'dist/'
			}, {
				src: 'public/',
				dest: 'dist/'
			}, ]
		}),
	],
	external,
};

// ./dist/package.json
writeFile('./dist/package.json', JSON.stringify({...pkg,
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
}, null, 4)).catch(err=>{
	console.error("./dist not exist. pls try again.");
});