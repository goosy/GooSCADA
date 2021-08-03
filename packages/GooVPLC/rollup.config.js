import pkg from './package.json';
import { builtinModules } from 'module';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const external = [
    ...builtinModules,
    'node-snap7', // reserve
    '/.*\/conf\/config.js$/',
    '/.*\/con\/connections.js$/',
];
export default [{ // WSCLI
    input: './src/wscli.js',
    output: {
        file: pkg.exports['./wscli'],
        format: 'es',
    },
    plugins: [
        resolve({
            preferBuiltins: true,
        }), // tells Rollup how to find XX in node_modules
        commonjs(), // converts XX to ES modules
    ],
    external,
}, { // main lib
    input: './src/index.js',
    output: {
        file: pkg.exports['.'],
        format: 'es',
    },
    plugins: [
        resolve({
            preferBuiltins: true,
        }), // tells Rollup how to find XX in node_modules
        commonjs(), // converts XX to ES modules
    ],
    external,
}]