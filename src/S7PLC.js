/*
 * Copyright (c) 2019, goosy.jo@gmail.com
 * MIT License
 */
import snap7 from "./node-snap7.js";

// "PE": s7server.srvAreaPE = 0	Process inputs
// "PA": s7server.srvAreaPA = 1	Process outputs
// "MK": s7server.srvAreaMK = 2	Merkers
// "CT": s7server.srvAreaCT = 3	Counters
// "TM": s7server.srvAreaTM = 4	Timers
// "DB": s7server.srvAreaDB = 5	DB
export class S7PLC extends snap7.S7Server {

    #areas = new Map();
    /** 
     * @param {string} name
     * @return {import('./S7Memory/S7Area.js').S7Area}
    */
    get_area(name) {
        return this.#areas.get(name);
    }
    /**
     * 增加一个S7区域
     * @param {import('./S7Memory/S7Area.js').S7Area} area
     */
    add_area(area) {
        this.#areas.set(area.name, area);
        area.join(this); // 偏移量强制为[0,0]
        let buff = Buffer.alloc(area.bytes);
        area.mount(buff);
        this.RegisterArea(this['srvArea' + area.type], area.DBNO, buff);
    }

    /** @type {string} */
    #host;
    /**
     * 设置 vplc 主机地址
     * @param {string} value
     */
    set host(value) {
        this.#host = value;
    }

    start_serve(){
        this.StartTo(this.#host);
    }

}
