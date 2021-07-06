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

    /**
     * 一个私有的数据区字典，为 {数据区自定名称或S7名称:数据区} 键值对
     * 大致结构为：
     * {
     *      "node": s7area1, 
     *      "DB1": s7area1, 
     *      "DB8": s7area2, 
     *      "send_data": s7area2, 
     *      "counter": s7area3, 
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
            // console.log('buffer   : ', buffer);
            // console.log('Area     : ' + tagObj.Area);
            // console.log('DBNumber : ' + tagObj.DBNumber);
            // console.log('Start    : ' + tagObj.Start);
            // console.log('Size     : ' + tagObj.Size);
            // console.log('WordLen  : ' + tagObj.WordLen);
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
