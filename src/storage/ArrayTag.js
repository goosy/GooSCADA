import { S7Tag, createTag } from './index.js';
export class ArrayTag extends S7Tag {
    #list;
    constructor(
        {
            name = "",
            elmType = "BYTE",
            length = 256,
            type = "ARRAY"
        } = {
                name: "",
                elmType: "BYTE",
                length: 256
            }
    ) {
        let list = new Array(length);
        for (let i = 0; i < list.length; i++) {
            list[i] = createTag(elmType);
        }
        let size = list[0].size * length;
        super({ name, size, type });
        this.#list = list;
    }
}

// console.log(new ArrayTag("exa").__proto__)