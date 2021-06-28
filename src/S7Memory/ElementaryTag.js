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
    #pre_value = null;

    /**
     * 读S7Tag值，通过buffer存储变量值，具体子类应覆盖
     */
    get value() {
        return this.buffer;
    }
    /**
     * 写S7Tag值，基类仅提供抽象，不实际写，具体子类应覆盖写入 buffer 存储区中。
     * @abstract
     */
    set value(value) {
        if (!this.mounted) throw new Error(`S7Tag:${this.name} = ${value} cant assign value, Tag have not mount a area`);
        // 由子类调用trigger_value_change() 来实现 emit("valuechange", , )
    }

    /** 
     * @constructor
     * @param {S7MParamter}
     */
    constructor({ name = "", type = "BYTE", bytes = 0, value } = { name: "", type: "BYTE", bytes: 0 }) {
        super({ name, type, bytes });
        this.#init_value = value;
        this.on("bufferchange", () => {
            this.trigger_value_change();
        });
    }

    trigger_value_change(){
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
        // 重新计算本Tag挂载位置
        this.value = this.#init_value; // 设置初始值
        this.trigger_value_change();
    }
}