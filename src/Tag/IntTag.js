import { S7Tag } from './S7Tag.js';
export class IntTag extends S7Tag {
    /**
     * @return {number}
     */
    get value() {
        return super.value.readInt16BE(0); // 调用基类确保已绑定
    }
    /**
     * 只接受 -32768 ~ 32767 整数
     * @param {number} value
     */
    set value(value) {
        super.value; // 调用基类确保已绑定
        if (value < -32768 || value > 32767) {
            console.log("Invalid value");
            return;
        }
        this.buffer.writeInt16BE(value, 0);
    }
    constructor({ name, type = "WORD" } = { name: "", type: "WORD" }) {
        const bytes = 2;
        super({ name, type, bytes });
    }
}

