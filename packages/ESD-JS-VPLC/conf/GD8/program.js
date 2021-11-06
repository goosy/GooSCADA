import { do_cmd } from "../program_comm.js";
const node = "nodes.nodeGD8";
const para = "node_para";
const commands = "commands_GD8";

export function program(plc) {
    do_cmd(plc, { node, para, commands });
}