import { ByteTag } from './ByteTag.js';
export class SIntTag extends ByteTag {
    /**
     * @return {number}
     */
    get value() {
        let v = super.value;
        return v > 127 ? v - 256 : v; // 调用基类确保已加载
    }
    /**
     * 只接受整数
     * @param {number} value 
     */
    set value(value) {
        if (value < -128 || value > 127) {
            console.log("Invalid value");
            return;
        }
        super.value = value < 0 ? 256 + value : value; // 调用基类确保已加载
    }
    constructor({ name = "", type = "SINT", value = 0 } = { name: "", type: "SINT", value: 0 }) {
        const bytes = 1;
        super({ name, type, bytes, value });
    }
}
