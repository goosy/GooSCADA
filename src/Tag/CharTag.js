import { ByteTag } from "./ByteTag.js";
export class CharTag extends ByteTag {
    /**
     * @return {string}
     */
    get value() {
        super.value; // 调用基类确保已绑定
        return this.buffer.toString('utf8');
    }
    /**
     * 只接受单个字符
     * @param {string} value 
     */
    set value(value) {
        super.value; // 调用基类确保已绑定
        if (value.length > 1) {
            console.log("Invalid value");
            return;
        }
        this.buffer[0] = value.charCodeAt(0);
    }
    constructor({ name = "", type = "CHAR" } = { name: "", type: "CHAR" }) {
        super({ name, type });
    }
}
