export class Tag {
    #name; //变量名称
    #type; //类型
    #bytes; //字节数，必须在bind()之前设值，即bind()之后就不可以变了
    #bit_offset; //位偏移量
    #binded = false; //指示是否绑定至一区域
    buffer;

    /**
     * 读值，通过buffer存储变量值，具体子类应覆盖
     * @return {Buffer}
     */
    get value() {
        if (!this.#binded) throw new Error(`tag:${this.#name} have not bind a area`);
        return this.buffer;
    }
    /**
     * 基类不可写值，具体子类应覆盖
     * @param {Buffer} value
     */
    set value(value) { }

    // readonly
    get name() {
        return this.#name;
    }
    // readonly
    get type() {
        return this.#type;
    }
    // readonly
    get bit_offset() {
        if (!this.#binded) throw new Error(`tag:${this.#name} have not bind a area`);
        return this.#bit_offset;
    }
    // readonly
    get binded() {
        return this.#binded;
    }

    // 
    get bytes() {
        return this.#bytes;
    }
    /**
     * bind()之后，本字段就不可变
     * 基本数据类型由子类设定为永不可改
     * @param {number} value
     */
    set bytes(value) {
        if (this.#binded) throw new Error(`tag:${this.#name} have bind a area, cant change bytes.`);
        this.#bytes = value;
    }

    /**
     * 
     * @param {{string, string, number, int|string}} 变量描述对象 
     */
    constructor({ name = "", type = "BYTE", bytes = 0 } = { name: "", type: "BYTE", bytes: 0 }) {
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
        this.#binded = true;
    }

};

