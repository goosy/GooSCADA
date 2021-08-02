import { createMemory } from "../src/S7Memory/index.js"
const db = createMemory({ type: "DB", name: "myDB", bytes: 50 });
db.mount(Buffer.alloc(50));
let t;

console.log("================================\n")
t = createMemory({ type: "BOOL", name: "myBool" });
t.join(db, [0, 2]);
t.mount(db.buffer);
console.log(`Tag ${t.name} :`);
t.value = true;
console.log(t.value);
console.log(t.buffer);
console.log(db.buffer);
console.log("\n\n");

t = createMemory({ type: "BYTE", name: "myByte" });
t.join(db, [1]);
t.mount(db.buffer);
console.log(`Tag ${t.name} :`);
t.value = 0xFE;
console.log(t.value);
console.log(t.buffer);
console.log(db.buffer);
console.log("\n\n");

t = createMemory({ type: "USINT", name: "myUSInt" });
t.join(db, [2]);
t.mount(db.buffer);
console.log(`Tag ${t.name} :`);
t.value = 253;
console.log(t.value);
console.log(t.buffer);
console.log(db.buffer);
console.log("\n\n");

t = createMemory({ type: "SINT", name: "mySInt" });
t.join(db, [3]);
t.mount(db.buffer);
console.log(`Tag ${t.name} :`);
t.value = -128;
console.log(t.value);
console.log(t.buffer);
console.log(db.buffer);
console.log("\n\n");

t = createMemory({ type: "CHAR", name: "myChar" });
t.join(db, [4]);
t.mount(db.buffer);
console.log(`Tag ${t.name} :`);
t.value = 'A';
console.log(t.value);
console.log(t.buffer);
console.log(db.buffer);
console.log("\n\n");

t = createMemory({ type: "WORD", name: "myWord" });
t.join(db, [6]);
t.mount(db.buffer);
console.log(`Tag ${t.name} :`);
t.value = [0x11, 0xFE];
console.log(t.value);
console.log(t.buffer);
console.log(db.buffer);
console.log("\n\n");

t = createMemory({ type: "UINT", name: "myUInt" });
t.join(db, [8]);
t.mount(db.buffer);
console.log(`Tag ${t.name} :`);
t.value = 4605;
console.log(t.value);
console.log(t.buffer);
console.log(db.buffer);
console.log("\n\n");

t = createMemory({ type: "INT", name: "myInt" });
t.join(db, [12]);
t.mount(db.buffer);
console.log(`Tag ${t.name} :`);
t.value = -378;
console.log(t.value);
console.log(t.buffer);
console.log(db.buffer);
console.log("\n\n");

t = createMemory({ type: "DWORD", name: "myDWord" });
t.join(db, [16]);
t.mount(db.buffer);
console.log(`Tag ${t.name} :`);
t.value = [0xF8, 0xEE, 0x11, 0xFE];
console.log(t.value);
console.log(t.buffer);
console.log(db.buffer);
console.log("\n\n");

t = createMemory({ type: "UDINT", name: "myUDInt" });
t.join(db, [20]);
t.mount(db.buffer);
console.log(`Tag ${t.name} :`);
t.value = 0xF8FFFFFF;
console.log(t.value);
console.log(t.buffer);
console.log(db.buffer);
console.log("\n\n");

t = createMemory({ type: "DINT", name: "myDInt" });
t.join(db, [24]);
t.mount(db.buffer);
console.log(`Tag ${t.name} :`);
t.value = -2147483647;
console.log(t.value);
console.log(t.buffer);
console.log(db.buffer);
console.log("\n\n");

t = createMemory({ type: "REAL", name: "myReal" });
t.join(db, [28]);
t.mount(db.buffer);
console.log(`Tag ${t.name} :`);
t.value = -366.55;
console.log(t.value);
console.log(t.buffer);
console.log(db.buffer);
console.log("\n\n");
