import { S7Tag } from './index.js';

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

export class ComplexTag extends S7Tag {
    /**
     * 子tag，不可变
     *  @type {S7Tag}
     */
    #tags = [];
    get tags() {
        return [...this.#tags];
    }
    get_tag(name) {
        for (const tag of this.#tags) {
            if (tag.name === name) return tag;
        }
    }

    /**
     * 加入一个子Tag
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
     * @param {S7Memory} parent
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
     * @param {Offset} offset
     * @return {Offset}
     */
    mount(buff) {
        super.mount(buff); // 调用父类 mount()
        // 重新计算本Tag挂载位置
        const this_buffer = this.buffer;
        this.#tags.forEach(tag => tag.mount(this_buffer));
        return this.end_offset;
    }

    /**
     * 复合变量构造器
     * @constructor
     * @param {S7MParamter}
     * @param {S7Tag[]} tags
     */
    constructor({ name = "" } = { name: "" }, tags = []) {
        super({ name, type: "STRUCT" });
        this.addTags(tags);
        const new_bytes = this.append_offset[0];
        this.bytes = this.bytes < new_bytes ? new_bytes : this.bytes;
    }
}