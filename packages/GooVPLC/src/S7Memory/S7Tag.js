/**
 * @file 本类过时，不再使用
 */
import { S7Memory } from "./S7Memory.js";
/**
 * @typedef {[number, number]} Offset
 */
/**
 * @typedef {object} S7MParamter
 * @property {string} name
 * @property {string} type
 * @property {number} bytes
 * @property {Offset} offset
 */

export class S7Tag extends S7Memory {
    /** 
     * @constructor
     * @param {S7MParamter} 
     */
    constructor({ name = "", type = "BYTE", bytes = 0 } = { name: "", type: "BYTE", bytes: 0 }) {
        super({ name, type, bytes });
    }

    /**
     * 加载至一数据区域
     * 具体子类应判断起始offset的边界条件，特别是 BYTE WORD 等
     * @param {Buffer} buff
     * @param {Offset} offset
     */
    mount(buff) {
        super.mount(); // 调用父类 mount() 以更新 mounted 标志
        // 重新计算本Tag挂载位置
        let [begin_offset,] = this.start_offset;
        let bytes = this.bytes == 0 ? 1 : this.bytes;
        this.buffer = buff.slice(begin_offset, begin_offset + bytes);
    }
};
