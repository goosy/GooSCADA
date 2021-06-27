/*
 * Copyright (c) 2019, goosy.jo@gmail.com
 * MIT License
 */
import snap7 from "./node-snap7.js";
import { createMemory } from "./S7Memory/index.js";
const AreaType = {
    /**
     * @TODO 
     * "PE": s7server.srvAreaPE : Process inputs
     * "PA": s7server.srvAreaPA : Process outputs
     * "MK": s7server.srvAreaMK : Merkers
     * "CT": s7server.srvAreaCT : Counters
     * "TM": s7server.srvAreaTM : Timers
     */
    131: "MK",
    132: "DB"
}
export class S7PLC extends snap7.S7Server {

    #areas = new Map();
    /** 
     * 获得数据区
     * @param {string} area_name
     * @return {import('./S7Memory/S7Area.js').S7Area}
    */
    get_area(area_name) {
        return this.#areas.get(area_name);
    }
    /**
     * 获得指定Tag
     * 用tag的层级名称做为参数：数据区名,Tag名1,...,Tagn
     * 比如 get_tag("DB8","node","flow")
     * 如不存在，则返回null
     * @param {string[]} path
     * @return {import('./S7Memory/S7Tag.js').S7Tag|null}
    */
    get_mem(...path) {
        let area = this.get_area(path.shift());
        if (path.length === 0) return area;
        return area?.get_tag(...path);
    }

    #areabuff = {};
    /**
     * 增加一个S7区域
     * @param {import('./S7Memory/S7Area.js').S7Area} area
     */
    add_area(area) {
        this.#areas.set(area.name, area);
        area.join(this); // 偏移量强制为[0,0]
        let buff = Buffer.alloc(area.bytes);
        area.mount(buff);
        this.#areabuff[area.type + (area.type == "DB" ? area.DBNO : "")] = buff;
        // this.RegisterArea(this['srvArea' + area.type], , area.buffer);
    }

    init(confJSON) {
        this.host = confJSON.host;
        confJSON.areas.forEach(areaJSON => {
            const area = createMemory(areaJSON);
            this.add_area(area);
        });
        this.SetResourceless(true);
        this.on("readWrite", (sender, operation, tagObj, buffer, callback) => {
            // console.log('buffer   : ', buffer);
            // console.log('Area     : ' + tagObj.Area);
            // console.log('DBNumber : ' + tagObj.DBNumber);
            // console.log('Start    : ' + tagObj.Start);
            // console.log('Size     : ' + tagObj.Size);
            // console.log('WordLen  : ' + tagObj.WordLen);
            if (operation === this.operationRead) {
                this.#areabuff[AreaType[tagObj.Area] + tagObj.DBNumber].copy(buffer, 0, tagObj.Start, tagObj.Start + tagObj.Size);
                this.emit("read", tagObj, buffer);
                return callback(buffer);
            } else {
                buffer.copy(this.#areabuff[AreaType[tagObj.Area] + tagObj.DBNumber], tagObj.Start);
                this.emit("write", tagObj, buffer);
                return callback();
            }
        });
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

    start_serve() {
        this.StartTo(this.#host);
    }

    constructor(confJSON) {
        super();
        if(confJSON?.host)this.init(confJSON);
    }

}
