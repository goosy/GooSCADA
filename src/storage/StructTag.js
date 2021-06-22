import { ComplexTag, createTag } from './index.js';

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
    constructor(
        {
            name = "",
            tags = { type: "BYTE" }, // 结构
        } = {
                name: "",
                tags: [],
            }
    ) {
        super(
            { name, type: "STRUCT" },
            tags.map(/** @param {JSON} tagJSON */(tagJSON) => createTag(tagJSON.type, tagJSON))
        );
    }
}