import { do_cmd } from "../program_comm.js";
const node = "nodeYA1";
const para = "node_para";
const commands = "commands_YA1";

export function program(plc) {
    do_cmd(plc, { node, para, commands });
}