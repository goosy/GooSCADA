import { ComplexTag } from './ComplexTag.js';

/**
 * @typedef {[number, number]} Offset
 */
/**
 * @typedef {object} S7MParamter
 * @property {string} name
 * @property {string} type
 * @property {number} bytes
 * @property {JSON} element
 * @property {Offset} offset
 */

export class ArrayTag extends ComplexTag {

    /** @type {number} */
    #length;
    get length(){
        return this.#length;
    }

    /** @type {string} */
    #element_type;
    get element_type(){
        return this.#element_type;
    }

    /**
     * 数组S7Tag
     * @constructor
     * @param {S7MParamter}
     */
    constructor(
        {
            name = "",
            element = { type: "BYTE" }, // 元素结构
            length = 256,
        } = {
                name: "",
                elmType: "BYTE",
                length: 256
            }
    ) {
        super({ name, type: "ARRAY" });
        this.#length = length;
        this.#element_type = element.type;
    }
}
