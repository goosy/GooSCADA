import { Complex } from "./Complex.js";

/**
 * @typedef {[number, number]} Offset
 */
/**
 * @typedef {object} S7MParamter
 * @property {string} name
 * @property {string} type
 * @property {number} bytes
 * @property {JSON[]} tags
 * @property {Offset} offset
 */

export class S7Area extends Complex {

    /**
     * 加入到一个S7PLC CPU中，设置存储区位移和尺寸
     * 设定memory的位置，由子类扩展方法完成内元素的加入
     * @param {import("../S7PLC.js").S7PLC} parent
     * @param {Offset} offset
     * @returns {Offset}
     */
    join(parent, offset = this.start_offset) {
        // 起始地址边界检查在父类上
        return super.join(parent, offset);
    }

    /**
     * 数据区域
     * 建立实例时，如不给定buffer，构造器会自动分配一个给定大小的buffer
     * @constructor
     * @param {S7MParamter}
     */
    constructor({ name = "", type = "DB", bytes = 256 } = { name: "", type: "DB", bytes: 256 }) {
        super({ name, type, bytes })
    }

    /** @todo mount将由S7PLC转移到这里，内容挂载从这个类开始 */

}
