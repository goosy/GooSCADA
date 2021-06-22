import { ByteTag } from "./index.js";
export class CharTag extends ByteTag {
    /**
     * @return {string}
     */
    get value() {
        // 确保已加载
        if (!this.mounted) throw new Error(`ElementaryTag:${this.name} have not mount a area`);
        return this.buffer.toString('utf8');
    }
    /**
     * 只接受单个字符
     * @param {string} value 
     */
    set value(value) {
        // 确保已加载
        if (!this.mounted) throw new Error(`ElementaryTag:${this.name} have not mount a area`);
        if (value.length > 1) {
            console.log("Invalid value");
            return;
        }
        this.buffer[0] = value.charCodeAt(0);
    }
    constructor({ name = "", type = "CHAR" } = { name: "", type: "CHAR" }) {
        // bytes 继承
        super({ name, type });
    }
}
