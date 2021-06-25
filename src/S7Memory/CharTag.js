import { ByteTag } from "./ByteTag.js";
export class CharTag extends ByteTag {
    /**
     * @return {string}
     */
    get value() {
        return super.value.toString('utf8'); // 调用基类确保已加载
    }
    /**
     * 只接受单个字符
     * @param {string} value 
     */
    set value(value) {
        if (value.length > 1) {
            console.log("Invalid value");
            return;
        }
        super.value[0] = value.charCodeAt(0);
    }
    constructor({ name = "", type = "CHAR", value = '\0' } = { name: "", type: "CHAR", value: '\0' }) {
        // bytes 继承
        super({ name, type, value });
    }
}
