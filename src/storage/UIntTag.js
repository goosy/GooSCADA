import { WordTag } from './index.js';
export class UIntTag extends WordTag {
    constructor({ name = "", type = "UINT" } = { name: "", type: "UINT" }) {
        super({name, type});
    }
}