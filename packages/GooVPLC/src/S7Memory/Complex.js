import { S7Memory } from "./S7Memory.js";

/**
 * @typedef {[number, number]} Offset
 */
/**
 * @typedef {import('./ElementaryTag.js').ElementaryTag|import('./ComplexTag.js').ComplexTag} S7Tag
 */
/**
 * @typedef {object} S7MParamter
 * @property {string} name
 * @property {string} type
 * @property {number} bytes
 * @property {JSON} element
 * @property {Offset} offset
 */

export class Complex extends S7Memory {
    get hasValue() {
        return false;
    }

    /**
     * 子tag，不可变
     *  @type {S7Tag}
     */
    #tags = [];
    get tags() {
        return [...this.#tags];
    }
    /**
     * @param {string[]} path
     * @return {S7Tag}
     */
    get_tag(...path) {
        const name = path.shift();
        for (const tag of this.tags) {
            if (tag.name === name) {
                if (path.length == 0) return tag;
                return tag.get_tag(...path);
            }
        }
        return null;
    }

    /**
     * 加入一个子Tag，调整自身的偏移
     * @param {S7Tag} tag
     * @param {Offset} offset
     */
    addTag(tag, offset = this.append_offset) {
        this.#tags.push(tag);
        const [new_byte_offset, new_bit_offset] = tag.join(this, offset);
        const [append_byte_offset, append_bit_offset] = this.append_offset;
        if (append_byte_offset < new_byte_offset) {
            this.append_offset = [new_byte_offset, new_bit_offset];
        }
        if (append_byte_offset == new_byte_offset && append_bit_offset < new_bit_offset) {
            this.append_offset = [new_byte_offset, new_bit_offset];
        }
        const new_bytes = this.append_offset[0];
        this.bytes = this.bytes < new_bytes ? new_bytes : this.bytes;
    }
    /**
     * 存储区中增加一组 Tag
     * @param {S7Tag[]} tags
     */
    addTags(tags) {
        tags.forEach(tag => this.addTag(tag));
    }

    /**
     * 加入到一个数据区域，设置存储区位移和尺寸
     * 设定memory的位置，由子类扩展方法完成内元素的加入
     * @param {S7Memory|import("../S7PLC.js").S7PLC} parent
     * @param {Offset} offset
     * @returns {Offset}
     */
    join(parent, offset = this.start_offset) {
        // 起始地址必须在WORD的边界上
        return super.join(parent, this.next_word_bound(offset));
    }

    /**
     * 加载至一数据区域
     * 具体子类应判断起始offset的边界条件，特别是 WORD 等 Tag class
     * @param {Buffer} buff
     */
    mount(buff) {
        super.mount(buff); // 调用父类 mount()
        // 重新计算本Tag挂载位置
        const [begin_offset,] = this.start_offset;
        this.buffer = buff.slice(begin_offset, begin_offset + this.bytes);
        const this_buffer = this.buffer;
        this.#tags.forEach(tag => tag.mount(this_buffer));
    }

    /**
     * 复合变量构造器
     * @constructor
     * @param {S7MParamter}
     * @param {S7Tag[]} tags
     */
    constructor({ name = "", type = "COMPLEX", bytes = 256 } = { name: "", type: "COMPLEX", bytes: 256 }) {
        super({ name, type, bytes });
    }
}