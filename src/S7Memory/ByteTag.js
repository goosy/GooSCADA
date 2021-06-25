import { ElementaryTag } from './ElementaryTag.js'

export class ByteTag extends ElementaryTag {
    /**
     * @return {Buffer}
     */
    get value() {
        return super.value; // 调用基类确保已加载
    }
    /**
     * 只接受0-255整数
     * @param {number[]} value 
     */
    set value(value) {
        let buff = super.value; // 调用基类确保已加载
        if (value < 0 || value > 255) {
            console.log("Invalid value");
            return;
        }
        buff[0] = value;
    }

    /**
     * 加入到一个数据区域，设置存储区位移和尺寸
     * @param {S7Memory} parent
     * @param {Offset} offset=this.start_offset
     * @returns {Offset}
     */
    join(parent, offset = this.start_offset) {
        // 起始地址必须在Byte的边界上
        return super.join(parent, this.next_byte_bound(offset));
    }

    constructor({ name = "", type = "BYTE", value = 0 } = { name: "", type: "BYTE", value: 0 }) {
        const bytes = 1;
        super({ name, type, bytes, value });
    }
}