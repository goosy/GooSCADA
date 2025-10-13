import { join } from 'node:path';
import { GCL } from './gcl.js';

function gen_load(filename) {
    return async (conf_path) => {
        const gcl = await GCL.load_file(join(conf_path, filename));
        return gcl.document.toJS();
    }
}

export const get_plc_config = gen_load('./config.yaml');
export const get_tcps = gen_load('./tcp.yaml');
export const get_custom_program = async (conf_path) => {
    const cp_path = new URL(`file:${join(conf_path, "program.mjs")}`);
    return (await import(cp_path)).program; // vplc自己的处理程序
}
