import { DWordTag } from "./DWordTag.js";
export class RealTag extends DWordTag {
    /**
     * @return {number}
     */
    get value() {
        return super.value.readFloatBE(0); // 调用基类确保已加载
    }
    /**
     * 只接受浮点数
     * @param {number} value
     */
    set value(value) {
        let buff = super.value; // 调用基类确保已加载
        if (typeof value !== "number") {
            console.log("Invalid value");
            return;
        }
        buff.writeFloatBE(value, 0);
        this.trigger_value_change();
    }
    constructor({ name = "", value = 0.0 } = { name: "", value: 0.0 }) {
        const type = "REAL";
        const bytes = 4;
        super({ name, type, bytes, value });
    }
}