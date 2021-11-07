import { do_cmd } from "../program_comm.js";
const node = "nodeYA7";
const para = "node_para";
const commands = "commands_YA7";

export function program(plc) {
    do_cmd(plc, { node, para, commands });
}