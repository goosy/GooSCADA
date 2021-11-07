import { do_cmd } from "../program_comm.js";
const node = "nodeGD9";
const para = "node_para";
const commands = "commands_GD9";

export function program(plc) {
    do_cmd(plc, { node, para, commands });
}