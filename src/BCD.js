function Byte2Number(byte){
    if(byte > 153) return 0;
    let remainder = byte % 16;
    if (remainder > 9) return 0;
    let high = (byte - remainder) / 16 * 10;
    return high + remainder;
}

/**
 * @param {Uint8Array|Buffer} bytes
 * @return {number}
 */
export function BCDArray2Number(bytes) {
    let value = 0;
    for (let index = 0; index < bytes.length; index++) {
        value = value * 100 + Byte2Number(bytes[index]);
    }
    return value;
}

/**
 * @param {number} num
 * @return {Uint8Array|Buffer}
 */
export function Number2BCDArray(num) {
    let value = [];
    while(num>0) { 
        let remainder = num % 100; 
        num = Math.floor(num / 100);
        value.unshift( Math.floor(remainder / 10) * 16 + remainder % 10);
    }
    return value;
}
