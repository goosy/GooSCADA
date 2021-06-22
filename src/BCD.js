/**
 * BCD字节转换为十进制数
 * @param {number} BCD_BYTE
 * @returns {number}
 */
function BCD2DEC(BCD_BYTE) {
    if (BCD_BYTE > 0x99) return 99;
    return BCD_BYTE - (BCD_BYTE >> 4) * 6;
}
/**
 * BCD字节转换为十进制数
 * @param {number} BCD_BYTE
 * @returns {number}
 */
function DEC2BCD(DEC_BYTE) {
    if (DEC_BYTE > 99) return 0x99;
    return DEC_BYTE + Math.floor(DEC_BYTE / 10) * 6;
}

/**
 * 将数字转化为指定进制数组
 * @param  {Number} num
 * @param  {Number} base
 * @return {number[]}
 */
function Num2BaseArray(num, base) {
    let ret = [];
    while (num > 0) {
        ret.unshift(num % base);
        num = (num - ret[0]) / base;
    }
    return ret;
}
/**
 * 将无符号数字转化为字节数组
 * @param  {Number} num
 * @return {number[]}
 */
function Num2ByteArray(num) {
    let ret = [];
    while (num != 0) {
        ret.unshift(num & 0xFF);
        num >>>= 8;
    }
    return ret;
}
/**
 * 将字节数组转化为指定进制的数字
 * @param {Uint8Array|Buffer} btye_list
 * @return {number}
 */
function ByteArray2Number(btye_list, base) {
    return btye_list.reduce((value, byte) => value * base + byte, 0);
}

/**
 * 将BCD转换为十进制数
 * @param {number} BCD
 * @return {number}
 */
export function BCD2Decimal(BCD) {
    let DECArray = Num2ByteArray(BCD).map(BCD2DEC);
    return ByteArray2Number(DECArray, 100);
}

/**
 * @param {number} num
 * @return {Uint8Array}
 */
export function Decimal2BCD(dec) {
    let BCDArray = Num2BaseArray(dec, 100).map(DEC2BCD);
    return ByteArray2Number(BCDArray, 256);
}
