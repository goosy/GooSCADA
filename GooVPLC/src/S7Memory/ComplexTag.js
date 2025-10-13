import { Complex } from "./Complex.js";

/**
 * @typedef {[number, number]} Offset
 */
/**
 * @typedef {object} S7MParamter
 * @property {string} name
 * @property {string} type
 * @property {number} bytes
 * @property {JSON} element
 * @property {Offset} offset
 */

export class ComplexTag extends Complex {
    #init_value;
    #pre_value = null;

    /**
     * 复合变量构造器
     * @constructor
     * @param {S7MParamter}
     * @param {S7Tag[]} tags
     */
    constructor({ name = "", type = "COMPLEX", bytes = 0, value } = { name: "", type: "COMPLEX", bytes: 0 }) {
        super({ name, type, bytes });
        this.#init_value = value;
        this.on("bufferchange", (start, end) => {
            this.trigger_value_change();
        });
    }

    trigger_value_change() {
        if (!this.hasValue) return;
        this.emit("valuechange", this.#pre_value, this.value);
        this.#pre_value = this.value;
    }

    /**
     * 加载至一数据区域
     * 具体子类应判断起始offset的边界条件，特别是 BYTE WORD 等
     * @param {Buffer} buff
     * @param {Offset} offset
     */
    mount(buff) {
        super.mount(buff); // 调用父类 mount() 以更新 mounted 标志
        if (this.hasValue) this.value = this.#init_value; // 设置初始值
    }
}