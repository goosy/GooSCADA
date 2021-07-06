import { EventEmitter } from 'events';
import { MemoryBlock } from './MemoryBlock.js';
/**
 * @typedef {[number, number]} Offset
 */
/**
 * @typedef {object} S7MParamter
 * @property {string} name
 * @property {string} type
 * @property {number} bytes
 * @property {Offset} offset
 */

export class S7Memory extends EventEmitter{
    /** @type {string} */
    #name;
    /**
     * 存储名称，初始化时指定。
     * @readonly
     */
    get name() {
        return this.#name;
    }

    /** @type {string} */
    #type;
    /**
     * 存储类型，初始化时指定
     * @readonly 
     */
    get type() {
        return this.#type;
    }


    // #region memory
    /**
     * 存储大小及位置
     * @type {MemoryBlock}
     * */
    #memoryblock = new MemoryBlock();
    /**
     * 相对于父存储区的开始偏移值
     * @type {Offset}
     */
    get start_offset() {
        return [...this.#memoryblock.start];
    }
    /**
     * 相对于父存储区的结束偏移值
     * @type {Offset}
     */
    get end_offset() {
        return [...this.#memoryblock.end];
    }
    /**
     * 相对于本存储区的可插入偏移值
     * @type {Offset}
     */
    get append_offset() {
        return [...this.#memoryblock.append];
    }
    set append_offset(offset) {
        this.#memoryblock.append = offset;
    }
    /**
     * 存储字节数
     */
    get bytes() {
        return this.#memoryblock.bytes;
    }
    /**
     * 必须在mount()之前设值，即mount()之后，本字段不可变
     * 基本数据类型由子类设定为永不可改
     */
    set bytes(bytes) {
        if (this.mounted) throw new Error(`S7Tag:${this.name} have mount a area, cant change bytes.`);
        this.#memoryblock.bytes = bytes;
    }
    // #endregion


    /** @type {Buffer} */
    #buffer;
    get buffer() {
        if (!this.mounted) throw new Error(`${this.name} memory have not mounted!`);
        return this.#buffer;
    }
    set buffer(newbuffer) {
        if (!this.mounted) throw new Error(`${this.name} memory have not mounted!`);
        this.#buffer = newbuffer;
    }
    /**
     * 更新内存值，用新buffer覆盖内存指定位置，同时触发 bufferchange 事件
     * @param {Buffer} buffer
     * @param {number} start
     * @param {number} end
     */
    update_buffer(buffer, start, end){
        buffer.copy(this.#buffer, start, 0, end);
        this.emit("bufferchange", start, end);
    }

    /**
     * 指示是否加载存储区域
     * readonly
     * @returns {boolean}
     */
    get mounted() {
        return this.#memoryblock.mounted;
    }

    /**
     * 检查指定偏移量的下一个有效字节边界
     * @param {Offset}
     * @returns {Offset}
     */
    next_byte_bound([byte_offset = 0, bit_offset = 0] = [0, 0]) {
        if (bit_offset > 0) {
            byte_offset += 1;
        }
        return [byte_offset, 0];
    }
    /**
     * 检查指定偏移量的下一个有效字边界
     * @param {Offset}
     * @returns {Offset}
     */
    next_word_bound(offset) {
        let [byte_offset,] = this.next_byte_bound(offset);
        byte_offset = byte_offset % 2 == 0 ? byte_offset : byte_offset + 1;
        return [byte_offset, 0];
    }

    /**
     * 仅join()改变本属性
     *  @type {S7Memory} 
     */
    #parent;
    get parent() {
        return this.#parent;
    }
    /**
     * 父容器的 bufferchange 事件触发本内存的 bufferchange 事件
     */
    change_value_capturing() {
        this.#parent.on("bufferchange", (start, end) => {
            start = start > this.start_offset[0] ? start : this.start_offset[0];
            end = end < this.end_offset[0] ? end : this.end_offset[0];
            if (start < end) this.emit("bufferchange", start, end);
        })
    }
    /**
     * 加入到一个数据区域，设置存储区位移和尺寸
     * 设定memory的位置，由复合子类扩充本方法以完成子元素的加入
     * @abstract
     * @param {(S7Memory|import("../S7PLC.js").S7PLC)} parent
     * @param {Offset} offset
     * @returns {Offset}
     */
    join(parent, offset = [0, 0]) {
        this.#parent = parent;
        const block = this.#memoryblock;
        block.start = offset;
        this.change_value_capturing();
        return block.end;
    }
    /**
     * 装载数据区域，设置装载标志
     * 本类不实际加载由子类扩展方法完成加载
     * @abstract
     * @param {Offset?} offset
     */
    mount() {
        this.#memoryblock.mounted = true;
    }

    /**
     * @constructor
     * @param {S7MParamter}
     */
    constructor({ name = "", type = "BYTE", bytes = 1 } = { name: "", type: "BYTE", bytes: 1 }) {
        super();
        this.#name = name;
        this.#type = type;
        this.bytes = bytes;
        this.setMaxListeners(100);
    }
}