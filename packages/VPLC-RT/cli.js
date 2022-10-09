import { start } from './lib/index.js';

const [, , work_path = '.'] = process.argv;
process.chdir(work_path);
await start(work_path);