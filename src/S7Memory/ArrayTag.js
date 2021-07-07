import { ComplexTag } from './ComplexTag.js';
import { createMemory } from "./index.js"

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
    get length() {
        return this.#length;
    }

    /** @type {string} */
    #element_type;
    get element_type() {
        return this.#element_type;
    }

    /**
     * S7Tag数组
     * @constructor
     * @param {S7MParamter}
     */
    constructor(
        {
            name = "",
            element = { type: "BYTE" }, // 元素结构
            length = 0,
        } = {
                name: "",
                elmType: "BYTE",
                length: 0
            }
    ) {
        super({ name, type: "ARRAY", byte:0 });// this.bytes must be 0!
        this.#length = length;
        this.#element_type = element.type;
        for (let i = 0; i < length; i++) {
            this.addTag(createMemory(element));
        }
    }
}
