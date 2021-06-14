import { WordTag } from './WordTag.js';
export class DateTag extends WordTag {
    static msPerDay = 86400000;
    /**
     * @return {number}
     */
    get rawValue() {
        return super.value; // 调用基类确保已绑定
    }
    /**
     * @return {Date}
     */
    get value() {
        let ms = super.value * DateTag.msPerDay; // 调用基类确保已绑定
        return new Date(ms);
    }
    /**
     * 接受 Data 字面量 或 JS Date 对象
     * @param {string|Date} value
     */
    set value(value) {
        let date;
        if (value instanceof Date) date = value;
        else if (typeof (value) == "number") date = new Date(value);
        else if (typeof (value) == "string") {
            let valStr = value.toLowerCase().replace("date#", "").replace("d#", "");
            console.log(/\d+-\d+-\d+/.test(valStr));
            if (!/\d+-\d+-\d+/.test(valStr)) throw new Error('input error, must like "DATE#2021-5-6"!');
            date = new Date(valStr);
        } else {
            throw new Error("input error, parameter must be a string or Date or Number object.");
        }
        let ms = date.valueOf();
        super.value = (ms - ms % DateTag.msPerDay) / DateTag.msPerDay; // 调用基类确保已绑定
    }
    constructor({ name = "", type = "DATE" } = { name: "", type: "DATE" }) {
        super({ name, type });
    }
}