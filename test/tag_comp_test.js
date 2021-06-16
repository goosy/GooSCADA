import { createTag } from "../src/storage/index.js"

console.log("================================\n")

let buff = Buffer.alloc(50);
let t;

t = createTag("STRING", {
    name: "myString",
    length: 16
});
t.mount(buff, 32);
console.log(`S7Tag ${t.name} :`);
t.value = "I hate CCP";
console.log('size:', t.size);
console.log('length:', t.length);
console.log('value:', t.value);
console.log('buffer:', t.buffer);
console.log('raw:', buff);
console.log("\n");

t = createTag("ARRAY", {
    name: "myArray",
    elmType: "DINT",
    length: 5
});
t.size = 8;
t.mount(buff, 0);
console.log(`S7Tag ${t.name} :`);
t.value = "";
console.log('size:', t.size);
console.log('length:', t.length);
console.log('value:', t.value);
console.log('buffer:', t.buffer);
console.log('raw:', buff);
console.log("\n");
