import { createArea, createTag } from '../src/S7Memory/index.js'


console.log("================================\n")

let buff = Buffer.alloc(50);
let t;

t = createArea("DB", {
    name: "myDB",
    DBNO: 8,
    tags: [
        { name: "bool0", type: "BOOL" },
        { name: "bool1", type: "BOOL" },
        { name: "bool2", type: "BOOL" },
        { name: "bool3", type: "BOOL" },
        { name: "bool4", type: "BOOL" },
        { name: "bool5", type: "BOOL" },
        { name: "bool6", type: "BOOL" },
        { name: "bool7", type: "BOOL" },
        { name: "bool8", type: "BOOL" },
        { name: "bool9", type: "BOOL" },
        { name: "status", type: "BYTE" },
        { name: "process", type: "DINT" },
        {
            name: "member", type: "STRUCT", tags: [
                { name: "count", type: "INT" },
            ]
        },
    ],
});
t.join({}, [0, 0]);
t.mount(buff);
t.get_tag("bool0").value = true;
t.get_tag("bool7").value = true;
t.get_tag("bool8").value = true;
t.get_tag("bool9").value = true;
t.get_tag("process").value = 65535;
t.get_tag("status").value = 0x8f;
t.get_tag("member").get_tag("count").value = 32767;
console.log(`S7Tag ${t.name} :`);
console.log('DBNO:', t.DBNO);
console.log('bytes:', t.bytes);
console.log('tags:', t.tags);
console.log('value:', t.value);
console.log('buffer:', t.buffer);
console.log('raw:', buff);
console.log("\n");