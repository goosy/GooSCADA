import { createTag } from "../src/Tag/index.js"

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
console.log('bytes:', t.bytes);
console.log('length:', t.length);
console.log('value:', t.value);
console.log('buffer:', t.buffer);
console.log('raw:', buff);
console.log("\n");

