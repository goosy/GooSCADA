import { do_cmd } from "../program_comm.js";
const node = "nodeJX7";
const para = "node_para";
const commands = "commands_JX7";

export function program(plc) {
    do_cmd(plc, { node, para, commands });
}