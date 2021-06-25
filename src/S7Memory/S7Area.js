import { S7Memory } from "./S7Memory.js";
import { ComplexTag } from "./ComplexTag.js";

/**
 * @typedef {[number, number]} Offset
 */
/**
 * @typedef {object} S7MParamter
 * @property {string} name
 * @property {string} type
 * @property {number} bytes
 * @property {JSON[]} tags
 * @property {Offset} offset
 */

export class S7Area extends S7Memory {
    /**
     * 子tag，不可变
     *  @type {S7Tag[]}
     */
    #tags = [];
    get tags() {
        return [...this.#tags];
    }
    /** 
     * mixin with ComplexTag
     * @param {string[]} path
     * @return {S7Tag}
     */
    get_tag(...path) {
        return ComplexTag.prototype.get_tag.apply(this, path);
    }

    add_tag(tag, offset = this.append_offset) {
        ComplexTag.prototype.add_tag.call(this, tag, offset);
    }
    /**
     * 存储区中增加Tag
     * 必须在mount()之前完成
     * @param {S7Tag} tag 
     * @param {Offset} offset
     */
    addTag(tag, offset) {
        this.#tags.push(tag);
        this.add_tag(tag, offset);
    }
    /**
     * 存储区中增加一组 Tag
     * mixin with ComplexTag
     * @param {S7Tag[]} tags
     */
    addTags(tags) {
        ComplexTag.prototype.addTags.call(this, tags);
    }

    /**
     * 数据区域
     * 建立实例时，如不给定buffer，构造器会自动分配一个给定大小的buffer
     * @constructor
     * @param {S7MParamter}
     */
    constructor({ name = "", type = "DB", bytes = 256 } = { name: "", type: "DB" }) {
        super({ name, type, bytes })
    }

    /**
     * 仅join()改变本属性
     *  @type {import("../S7PLC.js").S7PLC} 
     */
    #parent;
    get parent() {
        return this.#parent;
    }
    /**
    * 加入到一个数据区域，设置存储区位移和尺寸
    * 设定memory的位置，由子类扩展方法完成内元素的加入
    * @param {import("../S7PLC.js").S7PLC} parent 
    * 
    * @returns {Offset}
    */
    join(parent, offset = this.start_offset) {
        this.#parent = parent;
        // 起始地址必须在WORD的边界上
        return super.join(this.next_word_bound(offset));
    }

    /**
     * 加载一个数据区域
     * @override
     * @param {Buffer} buff
     * @param {number=} offset 
     * @return {number[]}
     */
    mount(buff) {
        super.mount(); // 调用父类 mount() 以更新 mounted 标志
        const [begin_offset,] = this.start_offset;
        this.buffer = buff.slice(begin_offset, begin_offset + this.bytes);
        const this_buffer = this.buffer;
        this.#tags.forEach(tag => tag.mount(this_buffer));
        return this.end_offset;
    }
}
