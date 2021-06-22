import { ElementaryTag } from './index.js';
export class WordTag extends ElementaryTag {
    /**
     * @return {number}
     */
    get value() {
        return super.value.readUInt16BE(0); // 调用基类确保已加载
    }
    /**
     * 只接受0-65535整数
     * @param {number} value
     */
    set value(value) {
        super.value; // 调用基类确保已加载
        if (value < 0 || value > 65535) {
            console.log("Invalid value");
            return;
        }
    }

    /**
     * 加入到一个数据区域，设置存储区位移和尺寸
     * @param {S7Memory} parent
     * @param {Offset} offset
     * @returns {Offset}
     */
    join(parent, offset = this.start_offset) {
        // 起始地址必须在WORD的边界上
        return super.join(parent, this.next_word_bound(offset));
    }
    constructor({ name = "", type = "WORD" } = { name: "", type: "WORD" }) {
        const bytes = 2;
        super({ name, type, bytes });
    }
}
