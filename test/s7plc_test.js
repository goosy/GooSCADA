import {
    createMemory,
    S7PLC,
} from "../src/index.js";
import { plc_config_JSON } from "../conf/config.js";

// 建立 VPLC
const plc = new S7PLC();

plc.on("event", (event) => {
    console.log(plc.EventText(event));
});

const areas = plc_config_JSON.areas;
areas.forEach(areaJSON => {
    const area = createMemory(areaJSON);
    plc.add_area(area);
});

plc.host = plc_config_JSON.host;
// plc.start_serve();

console.log("================================\n")

// 建立 VPLC
const t = plc;
t.get_mem("nodeGD8", "flow").value = 36.5;
console.log('nodeGD8:', t.get_mem('nodeGD8'));
console.log('nodeGD8/pressure:', t.get_mem("nodeGD8", "pressure")?.value);
console.log('nodeGD8/flow:', t.get_mem("nodeGD8", "flow")?.value);
console.log('commands_GD8:', t.get_mem('commands_GD8'));
console.log('commands_GD8/stopPumps:', t.get_mem("commands_GD8", "stopPumps")?.value);
console.log('member/count:', t.get_mem("member", "count")?.value);
console.log("\n");