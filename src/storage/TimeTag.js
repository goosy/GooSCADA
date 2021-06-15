import { DIntTag } from './DIntTag.js';
export class TimeTag extends DIntTag {
    static msPerDay = 86400000;
    static msPerHour = 3600000;
    static msPerMinute = 60000;
    static msPerSecond = 1000;
    /**
     * @return {number}
     */
    get rawValue() {
        return super.value; // 调用基类确保已绑定
    }
    /**
     * @return {string}
     */
    get value() {
        let value = super.value; // 调用基类确保已绑定
        let sign = 1;
        if (value < 0) {
            value = -value;
            sign = -1;
        }
        let strList = [];
        let remainder;
        if (value > 0) {
            remainder = value % TimeTag.msPerSecond;
            if (remainder > 0) strList.unshift(remainder + "ms");
            value = value - remainder;
        }
        if (value > 0) {
            remainder = value % TimeTag.msPerMinute;
            if (remainder > 0) strList.unshift(remainder / TimeTag.msPerSecond + "s");
            value = value - remainder;
        }
        if (value > 0) {
            remainder = value % TimeTag.msPerHour;
            if (remainder > 0) strList.unshift(remainder / TimeTag.msPerMinute + "m");
            value = value - remainder;
        }
        if (value > 0) {
            remainder = value % TimeTag.msPerDay;
            if (remainder > 0) strList.unshift(remainder / TimeTag.msPerHour + "h");
            value = value - remainder;
        }
        if (value > 0) {
            strList.unshift(value / TimeTag.msPerDay + "d");
        }
        return `TIME#${sign == -1 ? "-" : ""}${strList.join("_")}`;
    }
    /**
     * 将字符串转换为毫秒数
     * @param {string} value
     */
    static #parse(str) {
        if (str.endsWith('ms')) {
            return parseInt(str.slice(0, -2));
        }
        let value = parseInt(str.slice(0, -1));
        if (str.endsWith('s')) {
            return value * TimeTag.msPerSecond;
        }
        if (str.endsWith('m')) {
            return value * TimeTag.msPerMinute;
        }
        if (str.endsWith('h')) {
            return value * TimeTag.msPerHour;
        }
        if (str.endsWith('d')) {
            return value * TimeTag.msPerDay;
        }
        return 0;
    }
    /**
     * 只接受 TIME 字面量  TIME#-24d_20h_31m_23s_648ms ~ TIME#24d_20h_31m_23s_647ms
     * @param {string} value
     */
    set value(value) {
        let valStr = value.toLowerCase().replace("time#", "").replace("t#", "");
        let sign = 1;
        if (valStr[0] == '-') {
            valStr = valStr.substring(1);
            sign = -1;
        }
        let timeStrList = valStr.split("_");
        let msList = timeStrList.map(TimeTag.#parse);
        super.value = sign * msList.reduce((ms, value) => ms + value); // 调用基类确保已绑定
    }
    constructor({ name = "", type = "TIME" } = { name: "", type: "TIME" }) {
        super({name, type});
    }
}

