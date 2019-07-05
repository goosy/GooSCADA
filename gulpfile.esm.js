import gulp from 'gulp';
import {rollup} from 'rollup';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

gulp.task('copy',  ()=>{
    return gulp.src('node_modules/node-snap7/build/Release/node_snap7.node')
        .pipe(gulp.dest('lib'))
});

gulp.task('JSONFromFile-bundle', async function () {
    let bundle = await rollup({
        input: 'src/JSONFromFile.js',
        plugins: [
            resolve({
                preferBuiltins: true,
            }), // tells Rollup how to find XX in node_modules
            commonjs(), // converts XX to ES modules
            production && terser() // minify, but only in production
        ],
        external: [ 'fs' ],
    });
    await bundle.write({
        file: 'lib/JSONFromFile.js',
        format: 'esm', // 
    });

});

gulp.task('getData-bundle', async function () {
    let bundle = await rollup({
        input: 'src/getData.js',
        plugins: [
            resolve({
                preferBuiltins: true,
            }), // tells Rollup how to find XX in node_modules
            commonjs(), // converts XX to ES modules
            production && terser() // minify, but only in production
        ],
        external: [ 'events', 'fs', 'net', './JSONFromFile.js' ],
    });
    await bundle.write({
        file: 'lib/getData.js',
        format: 'esm', // 
    });

});

gulp.task('VPLC-bundle', async function () {
    let bundle = await rollup({
        input: 'src/VPLC.js',
        plugins: [
            resolve({
                preferBuiltins: true,
            }), // tells Rollup how to find XX in node_modules
            commonjs(), // converts XX to ES modules
            production && terser() // minify, but only in production
        ],
        external: [ 'module', 'events', 'util', './getData.js', './JSONFromFile.js', './node_snap7.node' ],
    });
    await bundle.write({
        file: 'lib/VPLC.js',
        format: 'esm', // 
    });
});

gulp.task('build', gulp.parallel('copy', 'JSONFromFile-bundle', 'getData-bundle', 'VPLC-bundle'));