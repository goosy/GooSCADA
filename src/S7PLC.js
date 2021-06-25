/*
 * Copyright (c) 2019, goosy.jo@gmail.com
 * MIT License
 */
import snap7 from "./node-snap7.js";

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
    get_tag(...path) {
        let area = this.get_area(path.shift());
        if (area === undefined) return null;
        return area.get_tag(...path);
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

    start_serve() {
        this.StartTo(this.#host);
    }

}
