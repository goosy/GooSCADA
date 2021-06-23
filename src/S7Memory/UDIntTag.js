import { DWordTag } from './index.js';
export class UDIntTag extends DWordTag {
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
        if (value < 0 || value > 4294967295) {
            console.log("Invalid value");
            return;
        }
        super.value.writeUInt32BE(value, 0); // 调用基类确保已加载
    }

    constructor({ name = "", type = "UDINT" } = { name: "", type: "UDINT" }) {
        super({ name, type });
    }
}
