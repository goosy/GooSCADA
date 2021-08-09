import { ComplexTag } from './ComplexTag.js';
export class StringTag extends ComplexTag {
    get hasValue() {
        return true;
    }
    get length() {
        return this.bytes - 2;
    }
    /**
     * @return {string}
     */
    get value() {
        if (!this.mounted) throw new Error(`S7Tag:${this.name} have not mount a area`);
        return this.buffer.slice(2, this.buffer[1] + 2).toString('utf8');
    }
    /**
     * 只接受字符串
     * @param {string} value 
     */
    set value(str) {
        if (!this.mounted) throw new Error(`S7Tag:${this.name} have not mount a area`);
        // str 长度最大长度不得超过 this.length，否则只复制合法范围内的字串
        let length = str.length > this.length ? this.length : str.length;
        const buff = this.buffer;
        for (let index = 0; index < length; index++) {
            buff[index + 2] = str.charCodeAt(index);
        }
        // S7 STRING 数据区第0字节为最大长度，第1字节为实际长度
        buff[1] = str.length;
        this.trigger_value_change();
    }

    /**
     * 
     */
    constructor(
        { name = "", length = 254, type = "STRING", value }
            = { name: "", length: 254, type: "STRING" }
    ) {
        if (length < 1 || length > 254) throw new Error('length must be between 1 and 254');
        let bytes = length + 2;
        super({ name, bytes, type, value });
    }
    /**
     * 同一个数据区域加载
     * @param {Buffer} buff 
     * @param {number} offset 
     */
    mount(buff) {
        super.mount(buff);
        // S7 STRING 数据区第0字节为最大长度，第1字节为实际长度
        this.buffer[0] = this.length;
    }
}
