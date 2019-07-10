import {task, parallel} from 'gulp';
import {rollup} from 'rollup';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

task('VPLC-bundle', async function () {
    let production = process.env.PRODUCTION == 'true';
    let bundle = await rollup({
        input: 'src/VPLC.js',
        plugins: [
            resolve({
                preferBuiltins: true,
            }), // tells Rollup how to find XX in node_modules
            commonjs(), // converts XX to ES modules
            production && terser() // minify, but only in production
        ],
        external: [ 'events', 'net', 'module', 'util', './node_snap7.node' ],
    });
    await bundle.write({
        file: 'lib/VPLC.js',
        format: 'esm', // 
    });
});

export let tasks = ['VPLC-bundle'];
