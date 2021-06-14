import { Tag } from './Tag.js'

export class ByteTag extends Tag {
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
        super.value; // 调用基类确保已绑定
        if (value < 0 || value > 255) {
            console.log("Invalid value");
            return;
        }
        this.buffer[0] = value;
    }
    constructor({ name = "", type = "BYTE" } = { name: "", type: "BYTE" }) {
        const bytes = 1;
        super({ name, type, bytes });
    }
}