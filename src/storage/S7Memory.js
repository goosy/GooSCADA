export class S7Memory {
    /** @type {string} */
    #name;
    /**
     * 变量名称
     * 初始化时指定。
     * @readonly
     * @return {Buffer}
     */
    get name() {
        return this.#name;
    }

    /** @type {string} */
    #type;
    /**
     * S7Tag type 
     * initial on constructor
     * @readonly 
     * @returns {string}
     */
    get type() {
        return this.#type;
    }

    /** @type {number} */
    #size; //字节数，
    /**
     * 存储字节数
     * @readonly
     */
    get size() {
        return this.#size;
    }
    /**
     * 必须在mount()之前设值，即mount()之后，本字段不可变
     * 基本数据类型由子类设定为永不可改
     */
    set size(value) {
        if (this.mounted) throw new Error(`S7Tag:${this.name} have mount a area, cant change size.`);
        this.#size = value;
    }

    /**
     * 空白存储区起始位置，用于插入子存储区 
     * @type {number}
     * */
    #append_offset = 0;
    /**
     * 空白存储区起始位置的位偏移值，用于插入子存储区
     * @type {number}
     * */
    #append_bit_offset = 0;

    // @TODO {S7Tag}
    /** @type {S7Memory[]} */ 
    children = [];
    //@TODO {S7Tag} tag
    /**
     * 装载Tag
     * @param {S7Memory} tag 
     * @returns {S7Memory}
     */
    append(tag, offset = this.#append_offset, bit_offset = this.#append_bit_offset) {
        tag.parent = this;
        this.children.push(tag);
        const [new_offset, new_bit_offset] = tag.mount(this.buffer, offset, bit_offset);
        if (this.#append_offset < new_offset) {
            this.#append_offset = new_offset;
            this.#append_bit_offset = new_bit_offset;
        }
        if (this.#append_offset = new_offset && this.#append_bit_offset < new_bit_offset){
            this.#append_bit_offset = new_bit_offset;
        }
        return tag;
    }

    /** @type {Buffer} */
    buffer;

    #mounted = false;
    /**
     * 指示是否加载存储区域
     * readonly
     * @returns {boolean}
     */
    get mounted() {
        return this.#mounted;
    }

    /**
     * 加载一个数据区域，设置装载标志
     * S7Area,S7Tag子类应扩展这个方法
     * @abstract
     */
    mount() {
        this.#mounted = true;
        return [0, 0];
    }

    constructor({ name = "", type = "BYTE", size = 0 } = { name: "", type: "BYTE", size: 0 }) {
        this.#name = name;
        this.#type = type;
        this.#size = size;
    }
}