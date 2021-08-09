import { IntTag } from './IntTag.js';
import { UIntTag } from './UIntTag.js';
import { DIntTag } from './DIntTag.js';
import { ComplexTag } from './ComplexTag.js';
import { BCD2Decimal, Decimal2BCD, BcdByteTag } from "./BCD.js"
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
const ms_per = {
    day: 86400000,
    hour: 3600000,
    minute: 60000,
    second: 1000,
}
const time_base2ms = [10, 100, 1000, 10000];

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
     * 接受 TIME 字面量或毫秒数 
     * 范围： TIME#-24d_20h_31m_23s_648ms ~ TIME#24d_20h_31m_23s_647ms
     * @param {string|number} value
     */
    set value(value) {
        if (typeof value === 'number') {
            super.value = value;
            return;
        }
        if (typeof value !== "string") {
            throw new Error("input error, parameter must be a string or a Number.");
        }
        let valStr = value.toLowerCase().replace("time#", "").replace("t#", "");
        let sign = 1;
        if (valStr[0] == '-') {
            valStr = valStr.substring(1);
            sign = -1;
        }
        super.value = sign * parse2ms(valStr); // 调用基类确保已加载
    }
    constructor({ name = "", type = "TIME", value = 0 } = { name: "", type: "TIME" }) {
        super({ name, type, value });
    }
}

export class S5TimeTag extends IntTag {

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
        this.trigger_value_change();
    }

    /**
     * 描述
     * @constructor
     * @param {S7MParamter}
     */
    constructor({ name, type = 'S5TIME', value = 0 } = { name: "", type: 'S5TIME', value: 0 }) {
        super({ name, type, value });
    }
}

export class DateTag extends UIntTag {
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
        const M = date.getMonth() + 1;
        const D = date.getDate();
        return `DATE#${Y}-${M}-${D}`;
    }
    /** @type {Date} */
    get JSDate() {
        let ms = this.rawValue * ms_per.day;
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
        super.value = (ms - ms % ms_per.day) / ms_per.day; // 调用基类确保已加载
    }
    constructor({ name = "", type = "DATE", value = 0 } = { name: "", type: "DATE" }) {
        super({ name, type, value });
    }
}


let year = new BcdByteTag({ name: "year" });
let month = new BcdByteTag({ name: "month" });
let day = new BcdByteTag({ name: "day" });
let hours = new BcdByteTag({ name: "hours" });
let minutes = new BcdByteTag({ name: "minutes" });
let seconds = new BcdByteTag({ name: "seconds" });
let msL = new BcdByteTag({ name: "msL" });
let msH = new BcdByteTag({ name: "msH" });
function getDTList() {
    let Y = year.value;
    return [
        Y < 90 ? Y + 2000 : Y + 1900,
        month.value,
        day.value,
        hours.value,
        minutes.value,
        seconds.value,
        msL.value + (msH.value - msH.value % 10) * 10
    ];
}
export class DTTag extends ComplexTag {
    get hasValue() {
        return true;
    }

    /** @type {string} */
    get value() {
        let [Y, M, D, H, I, S, MS] = getDTList();
        return `DATE_AND_TIME#${Y}-${M}-${D}-${H}:${I}:${S}.${MS}`;
    };
    /** @type {Date} */
    get date() {
        let [Y, M, D, H, I, S, MS] = getDTList();
        return new Date(Y, M - 1, D, H, I, S, MS);
    };

    /**
     * 接受 S7 DT 字面量，或 JS Date 对象
     * 范围 DT#1990-1-1-0:0:0.0 to DT#2089-12-31-23:59:59.999
     * @param {string|Date} dt
     */
    set value(dt) {
        let datestr, week = -1;
        if (dt instanceof Date) {
            datestr = dt.toISOString().replace("Z", "").replace("T", "-");
            week = dt.getDay();
        } else if (typeof (dt) == "string") {
            datestr = dt.toLowerCase().replace("date_and_time#", "").replace("dt#", "");
            if (!/^\d+-\d+-\d+-\d+:\d+:\d+\.\d+/.test(datestr)) throw new Error('input error, must like "DT#2089-12-31-23:59:59.999"!');
        } else {
            throw new Error("input error, parameter must be a string or Date or Number object.");
        }
        let [Y, M, D, H, I, S, MS] = datestr.split(/[-_:\.]/).map(str => parseInt(str));
        if (week == -1) week = new Date(Y, M - 1, D, H, I, S, MS).getDay();
        if (week == 0) week = 7;
        // 调用子Tag写值确保已加载
        year.value = Y % 100;
        month.value = M;
        day.value = D;
        hours.value = H;
        minutes.value = I;
        seconds.value = S;
        msL.value = MS % 100;
        msH.value = (MS - msL.value) / 10 + week;
        this.trigger_value_change();
    }

    /**
     * DT变量构造器
     * @constructor
     * @param {S7MParamter}
     */
    constructor({ name = "", value }) {
        super({ name, type: "DT", value });
        this.addTags([year, month, day, hours, minutes, seconds, msL, msH]);
    }
};