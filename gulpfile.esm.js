import {
    task,
    src,
    dest,
    series
} from 'gulp';
import {
    rollup
} from 'rollup';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import {
    terser
} from 'rollup-plugin-terser';
import {
    tasks
} from './build-define/gulpfile.user.js';

task('copy-snap7', async () => {
    src('node_modules/node-snap7/build/Release/node_snap7.node').pipe(dest('lib'));
});

task('copy', async () => {
    src('build-define/*').pipe(dest('dist/'));
    src('build-include/*').pipe(dest('dist/'));
    src('package.json').pipe(dest('dist/'));
    src('conf/*').pipe(dest('dist/conf'));
    src('lib/*').pipe(dest('dist/lib'));
});

task('VPLC', async function () {
    let production = process.env.PRODUCTION == 'true';
    let bundle;

    // // build node-snap7.js
    // bundle = await rollup({
    //     input: 'src/node-snap7.js',
    //     plugins: [
    //         resolve({
    //             preferBuiltins: true,
    //         }), // tells Rollup how to find XX in node_modules
    //         commonjs(), // converts XX to ES modules
    //         production && terser() // minify, but only in production
    //     ],
    //     external: ['events', 'module', 'util', './node_snap7.js'],
    // });
    // await bundle.write({
    //     file: 'lib/node-snap7.js',
    //     format: 'esm',
    // });
    
    bundle = await rollup({
        input: 'build-define/main.js',
        plugins: [
            resolve({
                preferBuiltins: true,
            }), // tells Rollup how to find XX in node_modules
            commonjs(), // converts XX to ES modules
            production && terser() // minify, but only in production
        ],
        external: ['events', 'net', 'module', 'util'],
    });
    await bundle.write({
        file: 'lib/index.js',
        format: 'esm',
    });
});

task('setdev', async () => {
    process.env.PRODUCTION = false;
})

task('setproduction', async () => {
    process.env.PRODUCTION = true;
})

task('dev', series('setdev', 'copy-snap7', 'VPLC', ...tasks, 'copy'));
task('build', series('setproduction', 'copy-snap7', 'VPLC', ...tasks, 'copy'));