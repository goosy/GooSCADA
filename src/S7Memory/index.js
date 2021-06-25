export { MemoryBlock } from "./MemoryBlock.js";
export { S7Memory } from "./S7Memory.js";
export { S7Area } from "./S7Area.js";
export { S7Tag } from "./S7Tag.js";
export { ElementaryTag } from "./ElementaryTag.js";
export { ComplexTag } from "./ComplexTag.js";

import { DBArea } from "./DBArea.js";
import { BoolTag } from "./BoolTag.js";
import { ByteTag } from "./ByteTag.js";
import { USIntTag } from "./USIntTag.js";
import { CharTag } from "./CharTag.js";
import { SIntTag } from "./SIntTag.js";
import { WordTag } from "./WordTag.js";
import { UIntTag } from "./UIntTag.js";
import { IntTag } from "./IntTag.js";
import { DWordTag } from "./DWordTag.js";
import { UDIntTag } from "./UDIntTag.js";
import { RealTag } from "./RealTag.js";
import { TODTag } from "./TODTag.js";
import { DIntTag } from "./DIntTag.js";
import { TimeTag, S5TimeTag, DateTag, DTTag } from "./DataTime.js";
import { StringTag } from "./StringTag.js";
import { ArrayTag } from "./ArrayTag.js";
import { StructTag } from "./StructTag.js";

export const S7MemoryType = {
    "BOOL": BoolTag,
    "BYTE": ByteTag,
    "USINT": USIntTag,
    "CHAR": CharTag,
    "SINT": SIntTag,
    "WORD": WordTag,
    "UINT": UIntTag,
    "REAL": RealTag,
    "DATE": DateTag,
    "S5TIME": S5TimeTag,
    "INT": IntTag,
    "DWORD": DWordTag,
    "UDINT": UDIntTag,
    "TOD": TODTag,
    "DINT": DIntTag,
    "TIME": TimeTag,
    "DT": DTTag,
    "STRING": StringTag,
    "ARRAY": ArrayTag,
    "STRUCT": StructTag,
    // S7Area
    "DB": DBArea,
};

/**
 * 建立指定类型Tag
 * @param {string} type
 * @param {JSON} json
 * @returns {S7Memory}
 */
export function createMemory(json = { type: '', tags: [] }) {
    if (!S7MemoryType.hasOwnProperty(json.type)) throw new Error('not exist this type!');;
    const memory = new S7MemoryType[json.type](json);
    if (typeof memory.addTags === 'function') {
        let tags = [];
        if (json.type === 'ARRAY') {
            for (let i = 0; i < json.length; i++) {
                tags.push(createMemory(json.element));
            }
        } else if (Array.isArray(json.tags)) {
            for (const tag of json.tags) {
                tags.push(createMemory(tag));
            }
        }
        memory.addTags(tags);
    }
    return memory;
}

export {
    // Area
    DBArea,
    // Elementary Tag
    BoolTag,
    ByteTag,
    USIntTag,
    CharTag,
    SIntTag,
    WordTag,
    UIntTag,
    DateTag,
    S5TimeTag,
    IntTag,
    DWordTag,
    UDIntTag,
    RealTag,
    TODTag,
    DIntTag,
    TimeTag,
    // Complex Tag
    DTTag,
    StringTag,
    ArrayTag,
    StructTag,
}

