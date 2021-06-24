import { UDIntTag } from './index.js';

const msPerDay = 86400000;
const msPerHour = 3600000;
const msPerMinute = 60000;
const msPerSecond = 1000;
const secondsPerMinute = 60;
const minutesPerHour = 60;

export class TODTag extends UDIntTag {
    /**
     * @return {number}
     */
    get rawValue() {
        return super.value; // 调用基类确保已加载
    }
    /**
     * @return {string}
     */
    get value() {
        let value = super.value; // 调用基类确保已加载
        let strList = [];
        let remainder;
        remainder = value % msPerSecond;
        strList.unshift(remainder); // 毫秒值
        value = (value - remainder) / msPerSecond;
        remainder = value % secondsPerMinute;
        strList.unshift(remainder); //秒值
        value = (value - remainder) / secondsPerMinute;
        remainder = value % minutesPerHour;
        strList.unshift(remainder);//分值
        value = (value - remainder) / minutesPerHour;
        strList.unshift(value);//时值
        return `TOD#${strList[0]}:${strList[1]}:${strList[2]}.${strList[3]}`;
    }
    /**
     * 只接受 S7 Date 字面量("TOD#0:0:0.0" ~ "TOD#23:59:59.999") 或 毫秒值 (0 ~ 86399999)
     * @param {string|number} value
     */
    set value(value) {
        let num;
        if (typeof (value) == "number") num = value;
        else if (typeof (value) == "string") {
            let valStr = value.toLowerCase().replace(/^(tod|time_of_day)#/, "");
            if (!/\d+:\d+:\d+\.\d+$/.test(valStr)) throw new Error('input error, must like "TOD#22:0:56.248"!');
            let TODList = valStr.split(/:|\./).map((str) => parseInt(str));
            num = TODList[0] * msPerHour
                + TODList[1] * msPerMinute
                + TODList[2] * msPerSecond
                + TODList[3];
        }
        if (num < 0 || num >= msPerDay) throw new Error('input error, 0 ~ 86399999 or "TOD#0:0:0.0" ~ "TOD#23:59:59.999"');
        super.value = num; // 调用基类确保已加载
    }
    constructor({ name, type = "TOD", value = 0 } = { name: "", type: "TOD", value: 0 }) {
        super({ name, type, value });
    }
}
