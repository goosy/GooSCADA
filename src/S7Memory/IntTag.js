import { WordTag } from './WordTag.js';
export class IntTag extends WordTag {
    /**
     * @return {number}
     */
    get value() {
        return super.value.readInt16BE(0); // 调用基类确保已加载
    }

    /**
     * 只接受 -32768 ~ 32767 整数
     * @param {number} value
     */
    set value(value) {
        if (value < -32768 || value > 32767) {
            console.log("Invalid value");
            return;
        }
        super.value.writeInt16BE(value, 0);// 调用基类确保已加载
    }
    constructor({ name, type = "INT", value = 0 } = { name: "", type: "INT", value: 0 }) {
        const bytes = 2;
        super({ name, type, bytes, value });
    }
}

