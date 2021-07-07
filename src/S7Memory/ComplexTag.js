import { Complex } from "./Complex.js";

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

export class ComplexTag extends Complex {

    /**
     * 复合变量构造器
     * @constructor
     * @param {S7MParamter}
     * @param {S7Tag[]} tags
     */
    constructor({ name = "", type = "COMPLEX", bytes = 0 } = { name: "", type: "COMPLEX", bytes: 0 }) {
        super({ name, type, bytes });
    }
}