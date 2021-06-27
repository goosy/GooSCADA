import {
    createMemory,
    S7PLC,
} from "../src/index.js";
import { plc_config_JSON } from "../conf/config.js";

// 建立 VPLC
const plc = new S7PLC(/* plc_config_JSON */);

plc.on("event", (event) => {
    console.log(plc.EventText(event));
});

plc.init(plc_config_JSON);

plc.start_serve();

let i=0;
setInterval(() => {
    plc.get_mem("commands_GD8", "nodeID").value = i++;
    console.log(plc.get_mem("commands_GD8"));
}, 4000);

// console.log("================================\n")

// // 建立 VPLC
// const t = plc;
// t.get_mem("nodeGD8", "flow").value = 36.5;
// t.get_mem("commands_GD8", "stopPumps").value = true;
// console.log('nodeGD8:', t.get_mem('nodeGD8'));
// console.log('nodeGD8/pressure:', t.get_mem("nodeGD8", "pressure")?.value);
// console.log('nodeGD8/flow:', t.get_mem("nodeGD8", "flow")?.value);
// console.log('commands_GD8:', t.get_mem('commands_GD8'));
// console.log('commands_GD8/stopPumps:', t.get_mem("commands_GD8", "stopPumps")?.value);
// console.log('member/count:', t.get_mem("member", "count")?.value);
// console.log("\n");