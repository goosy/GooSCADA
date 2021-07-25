// import { S7PLC, } from "../src/index.js";
import { S7PLC } from "../lib/index.js";
import { plc_config_JSON } from "../example/conf/config.js";

const s7plc = new S7PLC(/* plc_config_JSON */);
s7plc.init(plc_config_JSON);

s7plc.on("event", (event) => {
    console.log(s7plc.EventText(event));
});
s7plc.on("read", (tagObj, buffer) => {
    console.log("read ret: ", buffer);
})
s7plc.on("write", (tagObj, buffer) => {
    console.log("write: ", buffer);
})

s7plc.start_serve();

let i = 0;
setInterval(() => {
    s7plc.get_mem("nodes", "nodeGD8", "flow").value = 36.1 + i++;
    console.log(s7plc.get_mem("nodes", "nodeGD8").buffer);
}, 2000);

