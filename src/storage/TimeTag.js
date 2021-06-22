import { WordTag, DIntTag } from './index.js';
import { BCD2Decimal, Decimal2BCD } from "../BCD.js"
/**
 * @typedef {[number, number]} Offset
 */
/**
 * @typedef {object} S7MParamter
 * @property {string} name
 * @property {string} type
 * @property {number} bytes
 * @property {Offset} offset
 */

//#region parse
/**
 * Enum for ms per time unit.
 * @readonly
 * @enum {number}
 */
export const ms_per = {
    day: 86400000,
    hour: 3600000,
    minute: 60000,
    second: 1000,
}
export const time_base2ms = [10, 100, 1000, 10000];
export const TIME_BASE = {
    ms_10: 0,
    ms_100: 1,
    ms_1000: 2,
    ms_10000: 3,
}

/**
 * 将毫秒数转换成类似 24d_56h_33m_250ms 格式
 * @param {number} ms
 * @returns {string}
 */
function getTimeDurationStr(value) {
    let strList = [];
    let remainder;
    if (value > 0) {
        remainder = value % ms_per.second;
        if (remainder > 0) strList.unshift(remainder + "ms");
        value = value - remainder;
    }
    if (value > 0) {
        remainder = value % ms_per.minute;
        if (remainder > 0) strList.unshift(remainder / ms_per.second + "s");
        value = value - remainder;
    }
    if (value > 0) {
        remainder = value % ms_per.hour;
        if (remainder > 0) strList.unshift(remainder / ms_per.minute + "m");
        value = value - remainder;
    }
    if (value > 0) {
        remainder = value % ms_per.day;
        if (remainder > 0) strList.unshift(remainder / ms_per.hour + "h");
        value = value - remainder;
    }
    if (value > 0) {
        strList.unshift(value / ms_per.day + "d");
    }
    return strList.join("_");
}

/**
 * 将其它单位时间字符串转换为毫秒数
 * @param {string} str
 */
function parse_unit(str) {
    if (str.endsWith('ms')) {
        return parseInt(str.slice(0, -2));
    }
    let value = parseInt(str.slice(0, -1));
    if (str.endsWith('s')) {
        return value * ms_per.second;
    }
    if (str.endsWith('m')) {
        return value * ms_per.minute;
    }
    if (str.endsWith('h')) {
        return value * ms_per.hour;
    }
    if (str.endsWith('d')) {
        return value * ms_per.day;
    }
    return 0;
}
/**
 * 将字符串转换为毫秒数
 * @param {string} str
 */
function parse2ms(str) {
    let timeStrList = str.split("_");
    let msList = timeStrList.map(parse_unit);
    return msList.reduce((ms, value) => ms + value, 0);
}
//#endregion parse

export class TimeTag extends DIntTag {
    /**
     * 原始值
     * @return {number}
     */
    get rawValue() {
        // 所有获值的入口，通过调用基类确保tag已加载
        return super.value;
    }
    /**
     * S7 字面量形式的字符串
     * @return {string}
     */
    get value() {
        let value = this.rawValue;
        let sign = "";
        if (value < 0) {
            value = -value;
            sign = "-";
        }
        return `TIME#${sign}${getTimeDurationStr(value)}`;
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
        super.value = sign * parse2ms(valStr); // 调用基类确保已加载
    }
    constructor({ name = "", type = "TIME" } = { name: "", type: "TIME" }) {
        super({ name, type });
    }
}

export class S5TimeTag extends WordTag {

    /**
     * 原始值
     * @type {number}
     */
    get rawValue() {
        // 所有获值的入口，通过调用基类确保tag已加载
        return super.value;
    }
    set rawValue(value) {
        // 所有写值的入口，通过调用基类确保tag已加载
        super.value = value;
    }

    /**
     * S7 S5Time literal string, like "S5T#2h_11m_30s"
     * @type {string} 
     */
    get value() {
        const [count, base] = this.pair_value;
        let ms = count * time_base2ms[base];
        return `S5T#${getTimeDurationStr(ms)}`;
    }
    /** @type {(string|number)} */
    set value(value) {
        let count;
        if (typeof value === 'string') {
            let valStr = value.toLowerCase().replace("s5time#", "").replace("s5t#", "");
            count = parse2ms(valStr);
        } else if (typeof value === 'number') {
            count = value;
        } else count = 0;
        // 限定 S5Time 能表示的范围，否则为0
        count = count < 10000000 && count > 0 ? Math.floor(count / 10) : 0;
        let base = 0;
        while (count > 999) {
            count = Math.floor(count / 10);
            base++;
        }
        this.pair_value = [count, base]; // 调用基类确保已加载
    }

    /**
     * 时基与计数值，时基为0-3的整数，计数值为0~999的整数
     * @type {[number, number]}
     */
    get pair_value() {
        let base = (this.rawValue & 0xf000) >> 12; // 读前4位
        let count = BCD2Decimal(this.rawValue & 0x0fff);// 读后12位
        return [count, base];
    }
    set pair_value([count, base]) {
        if (count < 0 || count > 999) throw new Error(`S5TimeTag.count error : ${count} out of 0-999`);
        let dec = base * 1000 + count;
        this.rawValue = Decimal2BCD(dec);
    }

    /**
     * 描述
     * @constructor
     * @param {S7MParamter}
     */
    constructor({ name, type = 'S5TIME' } = { name: "", type: 'S5TIME' }) {
        super({ name, type });
    }
}
