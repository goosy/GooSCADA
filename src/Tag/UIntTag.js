import { WordTag } from './WordTag.js';
export class UIntTag extends WordTag {
    constructor({ name = "", type = "UINT" } = { name: "", type: "UINT" }) {
        super({name, type});
    }
}