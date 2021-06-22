import { ByteTag } from "./index.js";
export class USIntTag extends ByteTag {
    constructor({ name = "", type = "USINT" } = { name: "", type: "USINT" }) {
        super({ name, type });
    }
}
