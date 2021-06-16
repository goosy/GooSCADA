import { S7Memory } from "./S7Memory.js";

export class S7Tag extends S7Memory {
    /** @type {number} */
    #offset;
    /**
     * 偏移值，相对于父存储区而言
     * 该值仅在加入父存储区时修改改
     * @readonly
     */
    get offset() {
        return this.#offset;
    }
    /** @type {number} */
    #bit_offset; //位偏移量
    /**
     * 位偏移值，相对于父存储区而言
     * 该值仅在加入父存储区时修改改
     * @readonly
     * @return {number}
     */
    get bit_offset() {
        return this.#bit_offset;
    }

    // this.buffer 继承自父类
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
        value;
    }

    /**
     * @typedef {object} S7TagParamter
     * @property {string} name
     * @property {string} type
     * @property {number} size
     */
    /** @param {S7TagParamter} */
    constructor({ name = "", type = "BYTE", size = 0 } = { name: "", type: "BYTE", size: 0 }) {
        super({ name, type, size })
    }

    /** @type {S7Memory} */
    parent;

    /**
     * 加载至一数据区域
     * @param {Buffer} buff
     * @param {number} offset 
     * @param {number} bit_offset 
     */
    mount(buff, offset = 0, bit_offset = 0) {
        super.mount();
        let begin_offset = offset,
            begin_bit_offset = bit_offset,
            end_offset,
            end_bit_offset;
        // @todo 计算 offset bif_offset end_offset
        this.buffer = buff.slice(begin_offset, end_offset);
        this.#offset = begin_offset;
        this.#bit_offset = begin_bit_offset;
        // @todo 计算插入后的末尾偏移值
        return [end_offset, end_bit_offset];
    }

    join(parent, offset = 0, bit_offset = 0) {
        this.parent = parent;
        this.#offset = offset;
        this.#bit_offset = bit_offset;
    }

};
