import {
    createMemory,
    S7PLC,
} from "../src/index.js";

async function createVPLC(config_file) {
    const plc = new S7PLC();

    plc.on("event", (event) => {
        console.log(plc.EventText(event));
    });

    const { vplc } = await import(config_file);
    const areas = vplc.areas;
    areas.forEach(areaJSON => {
        const area = createMemory(areaJSON);
        plc.add_area(area);
    });

    plc.host = vplc.host;
    return plc;
}

console.log("================================\n")

// 建立 VPLC
const t = await createVPLC("../conf/config.js");
t.get_tag("nodeGD7", "flow").value = 36.5;
console.log('nodeGD7:', t.get_area('nodeGD7'));
console.log('nodeGD7/pressure:', t.get_tag("nodeGD7", "pressure")?.value);
console.log('nodeGD7/flow:', t.get_tag("nodeGD7", "flow")?.value);
console.log('member/count:', t.get_tag("member", "count")?.value);
console.log("\n");