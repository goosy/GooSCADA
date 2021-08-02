import { ElementaryTag } from './ElementaryTag.js';
export class WordTag extends ElementaryTag {
    /**
     * @return {Buffer}
     */
    get value() {
        return super.value; // 调用基类确保已加载
    }
    /**
     * 只接受字节数组
     * @param {number[]} value
     */
    set value(value) {
        let buff = super.value; // 调用基类确保已加载
        buff[0] = value[0];
        buff[1] = value[1];
        this.trigger_value_change();
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

    constructor({ name = "", type = "WORD", value = 0 } = { name: "", type: "WORD" }) {
        const bytes = 2;
        super({ name, type, bytes, value });
    }
}
