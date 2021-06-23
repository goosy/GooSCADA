/**
 * BCD字节转换为十进制数
 * @param {number} BCD_BYTE
 * @returns {number}
 */
export function BCD2DEC(BCD_BYTE) {
    if (BCD_BYTE > 0x99) return 99;
    return BCD_BYTE - (BCD_BYTE >> 4) * 6;
}
/**
 * BCD字节转换为十进制数
 * @param {number} BCD_BYTE
 * @returns {number}
 */
export function DEC2BCD(DEC_BYTE) {
    if (DEC_BYTE > 99) return 0x99;
    return DEC_BYTE + Math.floor(DEC_BYTE / 10) * 6;
}

/**
 * 将无符号数字按指定进制转化为字节数组
 * @param  {Number} num
 * @param  {Number} base
 * @return {number[]}
 */
export function Num2ByteArrayOfBase(num, base) {
    let ret = [];
    while (num > 0) {
        ret.unshift(num % base);
        num = (num - ret[0]) / base;
    }
    return ret;
}
/**
 * 将无符号数字转化为字节数组（即256进制）
 * @param  {Number} num
 * @return {number[]}
 */
export function Num2ByteArray(num) {
    let ret = [];
    while (num != 0) {
        ret.unshift(num & 0xFF);
        num >>>= 8;
    }
    return ret;
}

/**
 * 将字节数组转化为指定字节进制的数字
 * @param {Uint8Array|Buffer} btye_list
 * @return {number}
 */
export function ByteArray2NumberByBase(byte_list, base) {
    return byte_list.reduce((value, byte) => value * base + byte, 0);
}
/**
 * 将字节数组转化为数字(即字节256进制)
 * @param {Uint8Array|Buffer} btye_list
 * @return {number}
 */
export function ByteArray2Number(byte_list) {
    return byte_list.reduce((value, byte) => (value << 8) + byte, 0);
}

/**
 * 将BCD转换为十进制数
 * @param {number} BCD
 * @return {number}
 */
export function BCD2Decimal(BCD) {
    let DECArray = Num2ByteArray(BCD).map(BCD2DEC);
    return ByteArray2NumberByBase(DECArray, 100);
}

/**
 * 将十进制数转换为BCD字节数组
 * @param {number} num
 * @return {number[]}
 */
export function Decimal2BCDArray(dec) {
    return Num2ByteArrayOfBase(dec, 100).map(DEC2BCD);
}

/**
 * @param {number} dec
 * @return {number}
 */
export function Decimal2BCD(dec) {
    return ByteArray2Number(Decimal2BCDArray(dec));
}
