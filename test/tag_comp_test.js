import { createTag } from "../src/storage/index.js"

console.log("================================\n")

let buff = Buffer.alloc(50);
let t;

t = createTag("STRING", {
    name: "myString",
    length: 16
});
t.join({}, [32, 0]);
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
t.join({}, [0, 0]);
t.mount(buff);
t.tags[0].value = 18990;
t.tags[1].value = 0;
t.tags[2].value = 220;
t.tags[3].value = 15;
t.tags[4].value = 65535;
console.log(`S7Tag ${t.name} :`);
console.log('bytes:', t.bytes);
console.log('length:', t.length);
console.log('value:', t.value);
console.log('tags:', t.tags);
console.log('buffer:', t.buffer);
console.log('raw:', buff);
console.log("\n");
