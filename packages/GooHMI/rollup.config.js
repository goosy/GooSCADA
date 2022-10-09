import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import { builtinModules as external } from 'module';

export default {
    input: "./src_http/index.js",
    output: [{
        file: pkg.exports["."],
        format: 'es',
    }, {
        file: pkg.exports["./cjs"],
        format: 'cjs',
    }],
    plugins: [
        resolve({ preferBuiltins: true }),
        commonjs(),
        copy({
            targets: [
                { src: './data.js', dest: 'dist/' },
            ]
        }),
        // replace({
        //     'process.env.NODE_ENV': JSON.stringify('production'),
        //     __buildDate__: () => JSON.stringify(new Date()),
        //     __buildVersion: 15,
        // }),
    ],
    external
};