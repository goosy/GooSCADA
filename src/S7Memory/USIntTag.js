import { ByteTag } from "./ByteTag.js";
export class USIntTag extends ByteTag {
    /**
     * @return {number}
     */
    get value() {
        return super.value.readUInt8(0); // 调用基类确保已加载
    }
    /**
     * 只接受0-255整数
     * @param {number} value 
     */
    set value(value) {
        let buff = super.value; // 调用基类确保已加载
        if (value < 0 || value > 255) {
            console.log("Invalid value");
            return;
        }
        buff.writeUInt8(value, 0);
    }

    constructor({ name = "", type = "USINT", value = 0 } = { name: "", type: "USINT", value: 0 }) {
        super({ name, type, value });
    }
}
