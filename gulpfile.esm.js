import {
    task,
    src,
    dest,
    series
} from 'gulp';
import {tasks} from './gulpfile.user.js';

task('copy', async () => {
    src('build-define/*').pipe(dest('dist/'));
    src('package.json').pipe(dest('dist/'));
    src('command/*').pipe(dest('dist/'));
    src('conf/*').pipe(dest('dist/conf'));
    await src('node_modules/node-snap7/build/Release/node_snap7.node')
        .pipe(dest('lib'));
    src('lib/*').pipe(dest('dist/lib/'));
});

task('setdev', async () => {
    process.env.PRODUCTION = false;
})

task('setproduction', async () => {
    process.env.PRODUCTION = true;
})

task('dev', series('setdev', ...tasks, 'copy'));
task('build', series('setproduction', ...tasks, 'copy'));