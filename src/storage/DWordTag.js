import { ElementaryTag } from './index.js';
export class DWordTag extends ElementaryTag {
    /**
     * @return {number}
     */
    get value() {
        return super.value.readUInt32BE(0); // 调用基类确保已加载
    }
    /**
     * 只接受 0 ~ 4,294,967,295 整数
     * @param {number} value
     */
    set value(value) {
        super.value; // 调用基类确保已加载
        if (value < 0 || value > 4294967295) {
            console.log("Invalid value");
            return;
        }
        this.buffer.writeUInt32BE(value, 0);
    }
    constructor({ name = "", type = "DWORD" } = { name: "", type: "DWORD" }) {
        const bytes = 4;
        super({ name, type, bytes });
    }
}
