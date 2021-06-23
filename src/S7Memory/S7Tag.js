import { S7Memory } from "./index.js";
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
     * 读S7Tag值，通过buffer存储变量值，具体子类应覆盖
     */
    get value() {
        if (!this.mounted) throw new Error(`S7Tag:${this.name} have not mount a area`);
        return this.buffer;
    }
    /**
     * 写S7Tag值，基类仅提供抽象，不实际写，具体子类应覆盖写入 buffer 存储区中。
     * @abstract
     */
    set value(value) {
        if (!this.mounted) throw new Error(`S7Tag:${this.name} = ${value} cant assign value, Tag have not mount a area`);
    }

    /** 
     * @constructor
     * @param {S7MParamter} 
     */
    constructor({ name = "", type = "BYTE", bytes = 0 } = { name: "", type: "BYTE", bytes: 0 }) {
        super({ name, type, bytes });
    }

    /**
     * 仅join()改变本属性
     *  @type {S7Memory} 
     */
    #parent;
    get parent() {
        return this.#parent;
    }
    /**
     * 加入到一个数据区域，设置存储区位移和尺寸
     * @param {S7Memory} parent
     * @param {Offset} offset=this.start_offset
     * @returns {Offset}
     */
    join(parent, offset = this.start_offset) {
        this.#parent = parent;
        return super.join(offset);
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
