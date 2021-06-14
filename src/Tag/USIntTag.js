import { ByteTag } from "./ByteTag.js";
export class USIntTag extends ByteTag {
    constructor(name, type = "USINT") {
        super(name, type);
    }
}
