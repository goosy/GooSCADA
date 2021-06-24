import { MemoryBlock } from "./MemoryBlock.js";
import { S7Memory } from "./S7Memory.js";

import { S7Area } from "./S7Area.js";

import { S7Tag } from "./S7Tag.js";
import { ElementaryTag } from "./ElementaryTag.js";
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

import { ComplexTag } from "./ComplexTag.js";
import { StringTag } from "./StringTag.js";
import { ArrayTag } from "./ArrayTag.js";
import { StructTag } from "./StructTag.js";

const S7TagType = {
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
 * @param {JSON} argus
 * @returns {S7Tag}
 */
function createTag(type, argus={type}) {
    return new S7TagType[type](argus);
}

export {
    // base
    MemoryBlock,
    S7Memory,
    S7Tag,
    // Area
    S7Area,
    DBArea,
    // base
    ElementaryTag,
    ComplexTag,
    // factory
    createTag,
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

