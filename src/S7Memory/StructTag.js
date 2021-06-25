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

export class StructTag extends ComplexTag {

    /**
     * 结构变量构造器
     * @constructor
     * @param {S7MParamter}
     */
    constructor({ name = "" } = { name: "" }) {
        super(
            { name, type: "STRUCT" },
        );
    }
}