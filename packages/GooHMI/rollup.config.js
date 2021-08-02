import pkg from './package.json';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy'

export default {
    input: pkg.exports[".src"],
    output: {
        file: pkg.exports["."],
        format: 'es',
    },
    plugins: [
        resolve(),
        commonjs(),
        json(),
        copy({
            targets: [
                { src: './data.js', dest: 'dist/' },
            ]
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
            __buildDate__: () => JSON.stringify(new Date()),
            __buildVersion: 15,

        }),
    ],
};