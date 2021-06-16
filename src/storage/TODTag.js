import { DWordTag } from './DWordTag.js';
export class TODTag extends DWordTag {
    static msPerDay = 86400000;
    static msPerHour = 3600000;
    static msPerMinute = 60000;
    static msPerSecond = 1000;
    static secondsPerMinute = 60;
    static minutesPerHour = 60;
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
        remainder = value % TODTag.msPerSecond;
        strList.unshift(remainder); // 毫秒值
        value = (value - remainder) / TODTag.msPerSecond;
        remainder = value % TODTag.secondsPerMinute;
        strList.unshift(remainder); //秒值
        value = (value - remainder) / TODTag.secondsPerMinute;
        remainder = value % TODTag.minutesPerHour;
        strList.unshift(remainder);//分值
        value = (value - remainder) / TODTag.minutesPerHour;
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
            num = TODList[0] * TODTag.msPerHour
                + TODList[1] * TODTag.msPerMinute
                + TODList[2] * TODTag.msPerSecond
                + TODList[3];
        }
        if (num < 0 || num > 86399999) throw new Error('input error, 0 ~ 86399999 or "TOD#0:0:0.0" ~ "TOD#23:59:59.999"');
        super.value = num; // 调用基类确保已加载
    }
    constructor({ name, type = "TOD" } = { name: "", type: "TOD" }) {
        super({ name, type });
    }
}
