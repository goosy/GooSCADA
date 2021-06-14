import { Tag } from './Tag.js';
export class SIntTag extends Tag {
    /**
     * @return {number}
     */
    get value() {
        return super.value.readInt8(0); // 调用基类确保已绑定
    }
    /**
     * 只接受整数
     * @param {number} value 
     */
    set value(value) {
        let buff = super.value; // 调用基类确保已绑定
        if (value < -128 || value > 127) {
            console.log("Invalid value");
            return;
        }
        buff.writeInt8(value, 0);
    }
    constructor({ name = "", type = "SINT" } = { name: "", type: "SINT" }) {
        const bytes = 1;
        super({ name, type, bytes });
    }
}
