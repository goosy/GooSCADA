import { S7Area } from "./index.js";
export class DBArea extends S7Area {
    #DBNO;
    /**
     * 数据区域
     * 建立实例时，如不给定buffer，构造器会自动分配一个给定大小的buffer
     * @constructor
     * @param {S7MParamter}
     */
    get DBNO(){
        return this.#DBNO;
    }
    constructor({ name = "", DBNO=1, bytes = 256, tags = [] } = { name: "", DBNO: 1}) {
        const type = "DB";
        super({ name, type, bytes, tags });
        this.#DBNO = DBNO;
    }

}