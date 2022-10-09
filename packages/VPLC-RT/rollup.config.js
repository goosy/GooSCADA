import pkg from './package.json';
import { builtinModules } from 'module';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const production = process.env.VPLC == "production";
export default {
	input: ['./src/index.js'],
	output: {
		file: pkg["exports"]["."],
		format: 'es',
	},
	plugins: [
		resolve({ preferBuiltins: true }),
		production && terser(),
	],
	external: [
		...builtinModules,
		'goovplc',
		'goohmi',
	],
};
