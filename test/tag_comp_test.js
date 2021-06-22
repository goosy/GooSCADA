import { createTag } from "../src/storage/index.js"

console.log("================================\n")

let buff = Buffer.alloc(50);
let t;

t = createTag("STRING", {
    name: "myString",
    length: 16
});
t.join({}, [0, 0]);
t.mount(buff);
console.log(`S7Tag ${t.name} :`);
t.value = "I hate CCP";
console.log('bytes:', t.bytes);
console.log('length:', t.length);
console.log('value:', t.value);
console.log('buffer:', t.buffer);
console.log('raw:', buff);
console.log("\n");

t = createTag("ARRAY", {
    name: "myArray",
    element: { type: "DINT" },
    length: 5
});
t.join({}, [16, 0]);
t.mount(buff);
t.tags[0].value = 18990;
t.tags[1].value = 0;
t.tags[2].value = 220;
t.tags[3].value = 15;
t.tags[4].value = 65535;
console.log(`S7Tag ${t.name} :`);
console.log('bytes:', t.bytes);
console.log('element_type:', t.element_type);
console.log('length:', t.length);
console.log('value:', t.value);
console.log('tags:', t.tags);
console.log('buffer:', t.buffer);
console.log('raw:', buff);
console.log("\n");

t = createTag("STRUCT", {
    name: "myStruct",
    tags: [
        { name: "isOn", type: "BOOL" },
        { name: "error", type: "BOOL" },
        { name: "status", type: "BYTE" },
        { name: "process", type: "DINT" },
        { name: "member", type: "STRUCT" , tags: [
             { name: "count", type: "INT" },
        ]},
    ],
    length: 5
});
t.join({}, [36, 0]);
t.mount(buff);
t.get_tag("isOn").value = true;
t.get_tag("error").value = true;
t.get_tag("process").value = 65535;
t.get_tag("member").get_tag("count").value = 32767;
console.log(`S7Tag ${t.name} :`);
console.log('bytes:', t.bytes);
console.log('tags:', t.tags);
console.log('value:', t.value);
console.log('buffer:', t.buffer);
console.log('raw:', buff);
console.log("\n");
