import { S7Tag } from './S7Tag.js';

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

export class ElementaryTag extends S7Tag {
    #init_value;
    /** 
     * @constructor
     * @param {S7MParamter}
     */
    constructor({ name = "", type = "BYTE", bytes = 0, value } = { name: "", type: "BYTE", bytes: 0 }) {
        super({ name, type, bytes });
        this.#init_value = value;
    }

    /**
     * 加载至一数据区域
     * 具体子类应判断起始offset的边界条件，特别是 BYTE WORD 等
     * @param {Buffer} buff
     * @param {Offset} offset
     */
    mount(buff) {
        super.mount(buff); // 调用父类 mount() 以更新 mounted 标志
        // 重新计算本Tag挂载位置
        this.value = this.#init_value; // 设置初始值
    }
}