import { UIntTag } from './index.js';

const msPerDay = 86400000;
export class DateTag extends UIntTag {
    static msPerDay = msPerDay;
    /**
     * 原始值
     * @return {number}
     */
    get rawValue() {
        // 所有获值的入口，通过调用基类确保tag已加载
        return super.value;
    }
    /** @type {String} */
    get value() {
        const date = this.JSDate;
        const Y = date.getFullYear();
        const M = date.getMonth()+1;
        const D = date.getDate();
        return `DATE#${Y}-${M}-${D}`;
    }
    /** @type {Date} */
    get JSDate(){
        let ms = this.rawValue * msPerDay;
        return new Date(ms);
    }

    /**
     * 接受 S7 Data 字面量，或 JS Date 对象，或原始天数
     * @param {string|Date|number} value
     */
    set value(value) {
        if (typeof (value) == "number") {
            super.value = value;
            return;
        }
        let date;
        if (value instanceof Date) date = value;
        else if (typeof (value) == "string") {
            let valStr = value.toLowerCase().replace("date#", "").replace("d#", "");
            if (!/\d+-\d+-\d+/.test(valStr)) throw new Error('input error, must like "DATE#2021-5-6"!');
            date = new Date(Date.UTC(...valStr.split('-')));
        } else {
            throw new Error("input error, parameter must be a string or Date or Number object.");
        }
        let ms = date.valueOf();
        super.value = (ms - ms % msPerDay) / msPerDay; // 调用基类确保已加载
    }
    constructor({ name = "", type = "DATE" } = { name: "", type: "DATE" }) {
        super({ name, type });
    }
}