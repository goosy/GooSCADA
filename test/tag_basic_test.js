import { createTag } from "../src/Tag/index.js"

console.log("================================\n")

let buff = Buffer.alloc(50);
let t;

t = createTag("BOOL", { name: "myBool" });
t.bind(buff, 0, 1);
console.log(`Tag ${t.name} :`);
t.value = true;
console.log(t.value);
console.log(t.buffer);
console.log(buff);
console.log("\n\n");

t = createTag("BYTE", { name: "myByte" });
t.bind(buff, 1);
console.log(`Tag ${t.name} :`);
t.value = 0xFE;
console.log(t.value);
console.log(t.buffer);
console.log(buff);
console.log("\n\n");

t = createTag("USINT", { name: "myUSInt" });
t.bind(buff, 2);
console.log(`Tag ${t.name} :`);
t.value = 253;
console.log(t.value);
console.log(t.buffer);
console.log(buff);
console.log("\n\n");

t = createTag("SINT", { name: "mySInt" });
t.bind(buff, 3);
console.log(`Tag ${t.name} :`);
t.value = -128;
console.log(t.value);
console.log(t.buffer);
console.log(buff);
console.log("\n\n");

t = createTag("CHAR", { name: "myChar" });
t.bind(buff, 4);
console.log(`Tag ${t.name} :`);
t.value = 'A';
console.log(t.value);
console.log(t.buffer);
console.log(buff);
console.log("\n\n");

t = createTag("WORD", { name: "myWord" });
t.bind(buff, 6);
console.log(`Tag ${t.name} :`);
t.value = 0x11FE;
console.log(t.value);
console.log(t.buffer);
console.log(buff);
console.log("\n\n");

t = createTag("UINT", { name: "myUInt" });
t.bind(buff, 8);
console.log(`Tag ${t.name} :`);
t.value = 4605;
console.log(t.value);
console.log(t.buffer);
console.log(buff);
console.log("\n\n");

t = createTag("INT", { name: "myInt" });
t.bind(buff, 12);
console.log(`Tag ${t.name} :`);
t.value = -378;
console.log(t.value);
console.log(t.buffer);
console.log(buff);
console.log("\n\n");

t = createTag("DWORD", { name: "myDWord" });
t.bind(buff, 16);
console.log(`Tag ${t.name} :`);
t.value = 0xF8EE11FE;
console.log(t.value);
console.log(t.buffer);
console.log(buff);
console.log("\n\n");

t = createTag("UDINT", { name: "myUDInt" });
t.bind(buff, 20);
console.log(`Tag ${t.name} :`);
t.value = 0xF8FFFFFF;
console.log(t.value);
console.log(t.buffer);
console.log(buff);
console.log("\n\n");

t = createTag("DINT", { name: "myDInt" });
t.bind(buff, 24);
console.log(`Tag ${t.name} :`);
t.value = -2147483647;
console.log(t.value);
console.log(t.buffer);
console.log(buff);
console.log("\n\n");
