import { Tag } from './Tag.js';
export class DIntTag extends Tag {
    /**
     * @return {number}
     */
    get value() {
        return super.value.readInt32BE(0); // 调用基类确保已绑定
    }
    /**
     * 只接受 -2,147,483,648 ~ 2,147,483,647 整数
     * @param {number} value
     */
    set value(value) {
        super.value; // 调用基类确保已绑定
        if (value < -2147483648 || value > 2147483647) {
            console.log("Invalid value");
            return;
        }
        this.buffer.writeInt32BE(value, 0);
    }
    constructor(name) {
        const type = "DWORD";
        const bytes = 4;
        super({ name, type, bytes });
    }
}
