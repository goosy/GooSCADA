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
import { DateTag } from "./DateTag.js";
import { IntTag } from "./IntTag.js";
import { DWordTag } from "./DWordTag.js";
import { UDIntTag } from "./UDIntTag.js";
import { RealTag } from "./RealTag.js";
import { TODTag } from "./TODTag.js";
import { DIntTag } from "./DIntTag.js";
import { TimeTag, S5TimeTag } from "./TimeTag.js";

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
    "STRING": StringTag,
    "ARRAY": ArrayTag,
    "STRUCT": StructTag,
};

/**
 * 建立指定类型Tag
 * @param {string} type
 * @param {any} argus
 * @returns {S7Tag}
 */
function createTag(type, argus={type}) {
    return new S7TagType[type](argus);
}

export {
    // base
    MemoryBlock,
    S7Memory,
    S7Area,
    S7Tag,
    //
    ElementaryTag,
    ComplexTag,
    // struct
    createTag,
    // 基本类型 BOOL BYTE CHAR WORD DWORD INT DINT REAL S5TIME TIME
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
    // 复杂类型 DATE_AND_TIME STRING ARRAY STRUCT
    StringTag,
    ArrayTag,
    StructTag,
}

