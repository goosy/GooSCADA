/*
 * Copyright (c) 2019, goosy.jo@gmail.com
 * MIT License
 */

import {
    createMemory,
    S7PLC,
    GooNodeDriver
} from "./src/index.js";
import { plc_config_JSON } from "./conf/config.js";

// create a VPLC server
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

plc.start_serve();
