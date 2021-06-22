import { S7Memory, S7Tag } from "./index.js";

export class S7Area extends S7Memory {
    /** @type {S7Tag[]} */
    tags = [];
    /**
     * 存储区中增加Tag
     * 必须在mount()之前完成
     * @param {S7Tag} tag 
     * @param {Offset} offset
     */
    addTag(tag) {
        tag.parent = this;
        this.tags.push(tag);
    }
    /**
     * 存储区中增加一组 Tag
     * @param {S7Tag[]} tags
     * @param {Offset} offset
     */
    addTags(tags) {
        tags.forEach(tag => this.addTag(tag, offset));
    }

    /**
     * 数据区域
     * 建立实例时，如不给定buffer，构造器会自动分配一个给定大小的buffer
     * @constructor
     * @param {string} name
     * @param {string} type
     * @param {number} bytes
     * @param {number} offset
     * @param {Buffer} buff
     */
    constructor({ name = "", type = "DB", bytes = 256, buffer = Buffer.alloc(this.bytes), offset = 0 }) {
        super({ name, type, bytes })
        this.#mount(buffer, offset);
        // let server = this.s7server;
        // area.tags.forEach(tag => {
        //     tag.buffer = buf;
        //     this.setTag(tag);
        // })
        // server.RegisterArea(server.srvAreaDB, area.DBNO, buf);
    }

    /**
     * 加入到一个数据区域，设置存储区位移和尺寸
     * 设定memory的位置，由子类扩展方法完成内元素的加入
     * @abstract
     * @returns {Offset}
     */
    join(parent, offset = [0, 0]) {
        const end_offset = offset + this.bytes;
        this.buffer = buff.slice(offset, end_offset);
    }
    /**
     * 加载一个数据区域
     * @override
     * @param {Buffer} buff
     * @param {number=} offset 
     * @return {number[]}
     */
    #mount(buff, offset = [0, 0]) {
        super.mount();
        const end_offset = offset + this.bytes;
        this.buffer = buff.slice(offset, end_offset);
        tags.forEach(tag => tag.join(this.buff, tag.start_offset));
        return [end_offset, 0];
    }


}
