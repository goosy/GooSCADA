/*
 * Copyright (c) 2019, goosy.jo@gmail.com
 * MIT License
 */

import {
    createArea,
    S7PLC,
    GooNodeDriver
} from "./src/index.js";

/**
 * create a VPLC server
 * @param {string} config_file
 */
async function createVPLC(config_file) {
    const plc = new S7PLC();

    plc.on("event", (event) => {
        console.log(plc.EventText(event));
    });

    const { vplc } = await import(config_file);
    const areas = vplc.areas;
    areas.forEach(areaJSON => {
        const area = createArea(areaJSON.type, areaJSON);
        plc.add_area(area);
    });

    plc.host = vplc.host;
    return plc;
}

// 数据获取适配器 —— GooNodeDriver
// 这是一个调用GooNodeDriver类产生数据的例子
// todo: 其它适配器 
// var driver = new GooNodeDriver("./conf/channels.js");
// driver.createConns();

// 建立 VPLC
const plc = await createVPLC("./conf/config.js");
plc.start_serve();//vplc.host
