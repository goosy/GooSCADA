/*
 * Copyright (c) 2019, goosy.jo@gmail.com
 * MIT License
 */
/**
 * @typedef {import('./S7Memory/ElementaryTag.js').ElementaryTag|import('./S7Memory/ComplexTag.js').ComplexTag} S7Tag
 */
import snap7 from "node-snap7";
import { createMemory } from "./S7Memory/index.js";

/**
 * Area type abbreviation
 * in snap7 enum:
 * "PE": s7server.srvAreaPE = 0: Process inputs
 * "PA": s7server.srvAreaPA = 1: Process outputs
 * "MK": s7server.srvAreaMK = 2: Merkers
 * "CT": s7server.srvAreaCT = 3: Counters
 * "TM": s7server.srvAreaTM = 4: Timers
 * "DB": s7server.srvAreaDB = 5: DB
 * but in s7server.on("readWrite", (sender, operation, tagObj, buffer, callback) => {})
 * tagObj.Area are not same value, so need AreaType
 * @readonly
 * @enum {string} 
 */
const AreaType = {
    /**
     * @TODO PE PA CT TM
     */
    131: "MK",
    132: "DB"
}

export class S7PLC extends snap7.S7Server {

    /**
     * 一个私有的数据区字典，为 {数据区自定名称或S7名称:数据区} 键值对
     * 大致结构为：
     * {
     *      "node": s7area1, 
     *      "DB1": s7area1, 
     *      "send_data": s7area2, 
     *      "DB8": s7area2, 
     *      "ware_counter": s7area3, 
     *      "CT": s7area3, 
     *      ...
     * }
     * @type {Map<string,import('./S7Memory/S7Area.js').S7Area}
     */
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
     * 用tag的层级名称做为参数：数据区名.Tag名1.Tag名2.....Tagn
     * 比如 get_mem("DB8.node.flow")
     * 如不存在，则返回null
     * @param {string[]} path
     * @return {S7Tag|null}
    */
    get_mem(name) {
        const dotIndex = name.indexOf('.');
        const area = this.get_area(dotIndex === -1 ? name : name.substring(0, dotIndex));
        if (area && dotIndex === -1) return area;
        return area?.get_tag(name.substring(1 + dotIndex));
    }

    /**
     * 增加一个S7区域
     * @param {import('./S7Memory/S7Area.js').S7Area} area
     */
    add_area(area) {
        this.#areas.set(area.name, area);
        this.#areas.set(area.type + (area.type == "DB" ? area.DBNO : ""), area);
        area.join(this); // 偏移量强制为[0,0]
        let buff = Buffer.alloc(area.bytes);
        area.mount(buff);
    }

    init(confJSON) {
        this.host = confJSON.host;
        confJSON.areas.forEach(areaJSON => {
            const area = createMemory(areaJSON);
            this.add_area(area);
        });
        this.SetResourceless(true);
        this.on("readWrite", (sender, operation, tagObj, buffer, callback) => {
            // buffer   : buffer
            // Area     : tagObj.Area
            // DBNumber : tagObj.DBNumber
            // Start    : tagObj.Start
            // Size     : tagObj.Size
            // WordLen  : tagObj.WordLen
            const start = tagObj.Start;
            const end = tagObj.Start + tagObj.Size;
            // 获得对应区域的buffer
            const area = this.get_area(AreaType[tagObj.Area] + tagObj.DBNumber);
            if (operation === this.operationRead) {
                area.buffer.copy(buffer, 0, start, end);
                this.emit("read", tagObj, buffer);
                return callback(buffer);
            } else {
                area.update_buffer(buffer, start);
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
        if (confJSON?.host) this.init(confJSON);
        this.setMaxListeners(30);
    }

}
