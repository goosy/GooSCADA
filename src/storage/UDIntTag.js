import { DWordTag } from './DWordTag.js';
export class UDIntTag extends DWordTag {
    constructor({ name = "", type = "UDINT" } = { name: "", type: "UDINT" }) {
        super({ name, type });
    }
}
