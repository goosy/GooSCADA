import { Tag } from './Tag.js';
export class WordTag extends Tag {
    /**
     * @return {number}
     */
    get value() {
        return super.value.readUInt16BE(0); // 调用基类确保已绑定
    }
    /**
     * 只接受0-65535整数
     * @param {number} value
     */
    set value(value) {
        super.value; // 调用基类确保已绑定
        if (value < 0 || value > 65535) {
            console.log("Invalid value");
            return;
        }
        this.buffer.writeUInt16BE(value, 0);
    }
    constructor({ name = "", type = "WORD" } = { name: "", type: "WORD" }) {
        const bytes = 2;
        super({ name, type, bytes });
    }
}
