export class S7Tag {
    /** @type {string} */
    #name;
    /**
     * 变量名称，只读，初始化时指定。
     * @return {Buffer}
     */
    get name() {
        return this.#name;
    }

    #type;
    /**
     * S7Tag type : readonly 
     * initial on constructor
     * @returns {string}
     */
    get type() {
        return this.#type;
    }
    
    /** @type {number} */
    #bytes; //字节数，
    /**
     * 存储字节数 readonly
     */
    get bytes() {
        return this.#bytes;
    }
    /**
     * 必须在mount()之前设值，即mount()之后，本字段不可变
     * 基本数据类型由子类设定为永不可改
     * @param {number} value
     */
    set bytes(value) {
        if (this.mounted) throw new Error(`S7Tag:${this.name} have mount a area, cant change bytes.`);
        this.#bytes = value;
    }

    /** @type {number} */
    #offset;
    /**
     * 偏移值，只读，仅在加入 parentsTag 或 mount 到数据区时可更改
     */
    get offset() {
        return this.#offset;
    }
    /** @type {number} */
    #bit_offset; //位偏移量
    /**
     * 位偏移值，只读，仅在加入 parentsTag 或 mount 到数据区时可更改
     * @return {number}
     */
    get bit_offset() {
        return this.#bit_offset;
    }

    /** @type {Buffer} */
    buffer;
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

    #mounted = false; //指示是否绑定至一区域
    /**
     * 是否装载
     * readonly
     * @date 2021-06-15
     * @returns {boolean}
     */
    get mounted() {
        return this.#mounted;
    }

    /**
     * @typedef {object} S7TagParamter
     * @property {string} name
     * @property {string} type
     * @property {number} bytes
     */
    /** @param {S7TagParamter} */
    constructor({ name = "", type = "BYTE", bytes = 0 } = { name: "", type: "BYTE", bytes: 0 }) {
        this.#name = name;
        this.#type = type;
        this.#bytes = bytes;
    }

    /** @type {S7Tag} */
    parent;
    /** @type {S7Tag} */
    children;
    /**
     * 同一个数据区域绑定
     * @param {Buffer} buff
     * @param {number} offset 
     * @param {number} bit_offset 
     */
    mount(buff, offset = 0, bit_offset = 0) {
        this.buffer = buff.slice(offset, offset + this.#bytes);
        this.#offset = offset;
        this.#bit_offset = bit_offset;
        this.#mounted = true;
    }

    join(parent, offset = 0, bit_offset = 0) {
        this.parent = parent;
        this.#offset = offset;
        this.#bit_offset = bit_offset;
    }

};

