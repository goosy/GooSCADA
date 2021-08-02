/**
 * @typedef {[!number, number?]} Offset
 */
/**
 * @typedef {object} S7MParamter
 * @property {string} name
 * @property {string} type
 * @property {number} bytes
 * @property {Offset} offset
 */

/**
 * 返回一个Offset，检查有效性
 * @param {number} bytes
 * @param {number} bits
 * @returns {Offset}
 */
function getOffset(bytes, bits) {
    if (bytes < 0 ||
        bits < 0 ||
        bits > 7 ||
        (bits > 0 && bytes > 0))
        new Error("parameter wrong: bit_offset must be 0~7, if bytes > 0 , bit_offset must be 0. both never <0. ");
    return [bytes, bits];
}

/**
 * 存储结构
 * @class
 */
export class MemoryBlock {
    /** @type {boolean} */
    mounted = false;

    /** @type {number} */
    #start_bytes;
    /** @type {number} */
    #start_bits;
    /**
     * 相对于父存储区的开始偏移值
     * @type {Offset}
     */
    get start() {
        return [this.#start_bytes, this.#start_bits];
    }
    set start([offset, bit_offset]) {
        if (this.mounted) throw new Error(`S7Tag:${this.name} have mount a area, cant change offset.`);
        [this.#start_bytes, this.#start_bits] = getOffset(offset, bit_offset);
    }

    /** @type {number} */
    #append_bytes = 0;
    /** @type {number} */
    #append_bits = 0;
    /**
     * 相对于本存储区的可插入偏移值
     * @type {Offset}
     */
    get append() {
        return [this.#append_bytes, this.#append_bits];
    }
    set append([offset, bit_offset]) {
        [this.#append_bytes, this.#append_bits] = getOffset(offset, bit_offset);
    }

    /**
     * 存储区大小，值为0时代表1比特, 为其它正数时代表字节数
     * @type {number}
     */
    #bytes = 1;
    get bytes() {
        return this.#bytes;
    }
    set bytes(value) {
        if (this.mounted) throw new Error(`S7Tag:${this.name} have mount a area, cant change bytes.`);
        this.#bytes = value;
    }

    /**
     * 相对于父存储区的结束偏移值
     * @type {Offset}
     */
    get end() {
        let byte_offset = this.#start_bytes,
            bit_offset = this.#start_bits;
        if (this.bytes == 0) {
            if(bit_offset == 7){
                byte_offset++;
                bit_offset = 0;
            } else bit_offset++;
            return [byte_offset, bit_offset];
        } else {
            return [byte_offset + this.bytes, 0];
        }
    }

    /**
     * @constructor
     * @param {S7MParamter}
     */
    constructor({ offset = [0, 0], bytes = 1 } = { offset: [0, 0], bytes: 1 }) {
        this.start = getOffset(...offset);
        this.bytes = bytes;
    }

}