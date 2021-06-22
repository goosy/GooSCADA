import { S7Tag } from './index.js';

export class ComplexTag extends S7Tag {
    /**
     * 子tag，不可变
     *  @type {S7Tag}
     */
    #tags = [];
    get tags() {
        return [...this.#tags];
    }

    /**
     * 加入一个子Tag
     * @param {S7Tag} tag
     * @param {Offset} offset
     */
    addTag(tag, offset = this.append_offset) {
        this.#tags.push(tag);
        // this.bytes += tag.bytes; 由子类决定是否增加长度
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
     * @param {Offset} offset
     */
    addTags(tags) {
        tags.forEach(tag => this.addTag(tag));
    }

    /**
     * 加入到一个数据区域，设置存储区位移和尺寸
     * @returns {Offset}
     */
    // join(parent, offset = [0, 0]) {
    //     const end_offset = super.join(parent, offset);
    //     return end_offset;
    // }
    /**
     * 加载至一数据区域
     * 具体子类应判断起始offset的边界条件，特别是 WORD 等 Tag class
     * @param {Buffer} buff
     * @param {Offset} offset
     * @return {Offset}
     */
    mount(buff, offset = [0, 0]) {
        super.mount(buff, offset); // 调用父类 mount()
        // 重新计算本Tag挂载位置
        const this_buffer = this.buffer;
        this.tags.forEach(tag => tag.mount(this_buffer, tag.start_offset));
        return this.end_offset;
    }
}