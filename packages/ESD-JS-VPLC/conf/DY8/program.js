import { do_cmd } from "../program_comm.js";
const node = "nodeDY8";
const para = "node_para";
const commands = "commands_DY8";

export function program(plc) {
    do_cmd(plc, { node, para, commands });
}