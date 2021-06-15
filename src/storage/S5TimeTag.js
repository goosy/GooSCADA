import { Number2BCDArray, BCDArray2Number } from "../BCD.js"
import { WordTag } from './WordTag.js';
export class S5TimeTag extends WordTag {
    static base_10ms = 0;
    static base_100ms = 1;
    static base_1s = 2;
    static base_10s = 3;
    /**
     * 读基数
     * @return {number}
     */
    get base() {
        let value = super.value; // 调用基类确保已绑定
        return (value & 0xf000) >> 12; // 读前4位
    }
    /**
     * 写基数，只接受0-5的整数
     * @param {number} value
     */
    set base(base) {
        let value = super.value; // 调用基类确保已绑定
        value = value & 0x0fff | (base << 12); // 前4位用base替换
        super.value = value;
    }
    /**
     * 读计数值
     * @return {number}
     */
    get count() {
        super.value; // 调用基类确保已绑定
        let value = BCDArray2Number(this.buffer); // 调用基类确保已绑定
        return value % 1000; // 读后3位（12位）
    }
    /**
     * 写计数值，只接受 0~999 的整数
     * @param {number} value
     */
    set count(count) {
        let base = this.base; // 调用this.base确保已绑定
        if (count < 0 || count > 999) throw new Error(`S5TimeTag.count error : ${count} out of 0-999`);
        let BCDList = Number2BCDArray(count);
        while (BCDList.length < 2) BCDList.unshift(0);
        // 写入后12位
        this.buffer[0] = BCDList[0] | (base << 4);
        this.buffer[1] = BCDList[1];
    }
    constructor({ name, type = 'S5TIME' } = { name: "", type: 'S5TIME' }) {
        super({ name, type });
    }
}
