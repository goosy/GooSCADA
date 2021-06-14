export class Tag {
    #name; //变量名称
    #type; //类型
    #bytes; //字节数
    #bit_offset; //位偏移量
    #isBinding = false; //指示是否绑定至一区域
    buffer;

    /**
     * 读值，通过buffer存储变量值，具体子类应覆盖
     * @return {Buffer}
     */
    get value() {
        if (!this.#isBinding) throw new Error(`tag:${this.#name} have not bind a area`);
        return this.buffer;
    }
    /**
     * 基类不可写值，具体子类应覆盖
     * @param {Buffer} value
     */
    set value(value) { }

    // 以下几个属性只读
    get name() {
        return this.#name;
    }
    get type() {
        return this.#type;
    }
    get bytes() {
        return this.#bytes;
    }
    get bit_offset() {
        if (!this.#isBinding) throw new Error(`tag:${this.#name} have not bind a area`);
        return this.#bit_offset;
    }

    /**
     * 
     * @param {{string, string, number, int|string}} 变量描述对象 
     */
    constructor({ name, type = "byte", bytes = 2 } = { name: undefined }) {
        if (!name) throw new Error("name not gave!");
        this.#name = name;
        this.#type = type;
        this.#bytes = bytes;

    }

    /**
     * 同一个数据区域绑定
     * @param {Buffer} buff
     * @param {number} offset 
     * @param {number} bit_offset 
     */
    bind(buff, offset = 0, bit_offset = 0) {
        this.buffer = buff.slice(offset, offset + this.#bytes);
        this.#bit_offset = bit_offset;
        this.#isBinding = true;
    }

};

