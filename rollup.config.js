import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy'

export default {
    input: pkg.exports['.'],
    output: {
        file: pkg.exports['./dist'],
        format: 'es',
    },
    plugins: [
        resolve({
            preferBuiltins: true,
        }), // tells Rollup how to find XX in node_modules
        commonjs(), // converts XX to ES modules
        copy({
            targets: [
                { src: 'node_modules/node-snap7/build/Release/node_snap7.node', dest: 'dist' },
                { src: 'conf', dest: 'dist' },
                { src: 'public', dest: 'dist' },
            ]
        }),
    ],
    external: ['events', 'net', 'module', 'util', './conf/config.js'],
}
