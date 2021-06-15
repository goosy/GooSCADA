import { S7Tag } from './index.js'

export class ByteTag extends S7Tag {
    /**
     * @return {number}
     */
    get value() {
        return super.value.readUInt8(0); // 调用基类确保已绑定
    }
    /**
     * 只接受0-255整数
     * @param {number} value 
     */
    set value(value) {
        let buff = super.value; // 调用基类确保已绑定
        if (value < 0 || value > 255) {
            console.log("Invalid value");
            return;
        }
        buff[0] = value;
    }
    constructor({ name = "", type = "BYTE" } = { name: "", type: "BYTE" }) {
        const bytes = 1;
        super({ name, type, bytes });
    }
}