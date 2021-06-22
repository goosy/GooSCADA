import { ComplexTag, createTag } from './index.js';

/**
 * @typedef {[number, number]} Offset
 */
/**
 * @typedef {object} S7MParamter
 * @property {string} name
 * @property {string} type
 * @property {number} bytes
 * @property {(string|JSON)} element
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

    /**
     * 数组S7Tag
     * @constructor
     * @param {S7MParamter}
     */
    constructor(
        {
            name = "",
            element = { type: "BYTE" }, // 元素结构，仅 element_type = ("ARRAY" | "STRUCT") 时
            length = 256,
        } = {
                name: "",
                elmType: "BYTE",
                length: 256
            }
    ) {
        super({ name, type: "ARRAY" });
        let bytes = 0;
        for (let i = 0; i < length; i++) {
            const tag = createTag(element.type, element);
            this.addTag(tag);
            bytes += tag.bytes;
        }
        this.bytes = bytes;
        this.#length = length;
        this.#element_type = element.type;
    }
}
