import { exec } from 'node:child_process';
import { cp } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from "node:url";
import pkg from './package.json' with { type: 'json' };
import mri from 'mri';

const argv = mri(process.argv.slice(2), {
    boolean: ['help', 'version'],
    alias: {
        H: ['h', 'help'],
        V: ['v', 'version'],
    }
});
const [cmd = 'start', _path = '.'] = argv._;

process.chdir(_path);
const work_path = process.cwd();
const module_path = dirname(fileURLToPath(import.meta.url));
const version = pkg.version;

function show_help() {
    console.log(`usage:

vplc [subcommand] [path] [options]

subcommand 子命令:
  init                       在当前目录下生成配置样本
  start                      以当前目录下的配置文件运行VPLC，省略时的默认子命令
  stop                       结束当前目录配置文件所在的VPLC实例
  list                       显示有多少个pm2托管的进程，包括VPLC实例
  flush                      清空log
  help                       打印本帮助

path 参数:  指示要解析的YAML文件所在的目录，默认为 "." 即省略时为当前目录

options:
--version     | -V | -v      显示版本号，会忽略任何 subcommand 子命令
--help        | -H           打印本帮助，会忽略任何 subcommand 子命令

例子:
vplc                        以当前目录下的配置文件运行VPLC
vplc start ./conf           以 ./conf 目录下的配置文件运行VPLC
vplc stop
`);
}

if (argv.version) {
    console.log(`V${version}`);
} else if (argv.help) {
    show_help();
} else if (cmd === 'start') {
    exec(
        `pm2 start --name="VPLC-${basename(work_path)}" "${join(module_path, 'lib\\index.js')}"`,
        { cwd: work_path }
    );
} else if (cmd === 'stop') {
    exec(
        `pm2 delete "VPLC-${basename(work_path)}"`,
        { cwd: work_path }
    );
} else if (cmd === 'list') {
    exec(`pm2 list`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(stdout);
    });
} else if (cmd === 'init') {
    cp(join(module_path, '.\\conf\\'), work_path, { recursive: true });
} else if (cmd === 'flush') {
    exec(`pm2 flush`);
} else {
    show_help();
}
