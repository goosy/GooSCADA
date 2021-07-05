import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy'

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
    './conf/config.js',
    './conf/connections.js'
]
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
        copy({
            targets: [
                { src: 'node_modules/node-snap7/build/Release/node_snap7.node', dest: 'src' },
                { src: 'node_modules/node-snap7/build/Release/node_snap7.node', dest: 'lib' },
            ]
        }),
    ],
    external,
}]