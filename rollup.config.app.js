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
export default {
    input: './index.js',
    output: {
        file:'./dist/app.js',
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
                { src: 'conf', dest: 'dist/' },
                { src: 'lib/wscli.js', dest: 'dist/' },
                { src: 'package.json', dest: 'dist/' },
                { src: 'public/', dest: 'dist/' },
            ]
        }),
    ],
    external,
}