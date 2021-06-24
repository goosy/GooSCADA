import { DWordTag } from './index.js';
export class DIntTag extends DWordTag {
    /**
     * @return {number}
     */
    get value() {
        return super.value.readInt32BE(0); // 调用基类确保已加载
    }
    /**
     * 只接受 -2,147,483,648 ~ 2,147,483,647 整数
     * @param {number} value
     */
    set value(value) {
        if (value < -2147483648 || value > 2147483647) {
            console.log("Invalid value");
            return;
        }
        super.value.writeInt32BE(value, 0); // 调用基类确保已加载
    }
    constructor({ name = "", type = "DWORD", value = 0 } = { name: "", type: "DWORD", value: 0 }) {
        const bytes = 4;
        super({ name, type, bytes, value });
    }
}
