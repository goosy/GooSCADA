import { S7Tag } from './S7Tag.js';
export class StringTag extends S7Tag {
    get length() {
        return this.bytes - 2;
    }
    /**
     * @return {string}
     */
    get value() {
        let buff = super.value; // 调用基类Tag确保已加载
        return buff.toString('utf8');
    }
    /**
     * 只接受字符串
     * @param {string} value 
     */
    set value(str) {
        let buff = super.value; // 调用基类Tag确保已加载
        // str 长度最大长度不得超过 this.length，否则只复制合法范围内的字串
        let length = str.length > this.length ? this.length : str.length;
        for (let index = 0; index < length; index++) {
            buff[index + 2] = str.charCodeAt(index);
        }
        // S7 STRING 数据区第0字节为最大长度，第1字节为实际长度
        buff[1] = str.length;
    }

    /**
     * 
     */
    constructor(
        { name = "", length = 254, type = "STRING" }
            = { name: "", length: 254, type: "STRING" }
    ) {
        if (length < 1 || length > 254) throw new Error('length must be between 1 and 254');
        let bytes = length + 2;
        super({ name, bytes, type });
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
