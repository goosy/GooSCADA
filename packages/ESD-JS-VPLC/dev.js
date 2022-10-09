import { start } from './index.js';

// const [, , work_path = './conf/'] = process.argv;
process.chdir('./conf/');
await start(process.cwd());