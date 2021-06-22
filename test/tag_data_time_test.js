import { S5TimeTag, createTag } from "../src/storage/index.js"

console.log("================================\n")

let buff = Buffer.alloc(50);
let t;

t = createTag("S5TIME", { name: "myS5Time" });
t.mount(buff, [0]);
console.log(`S7Tag ${t.name} :`);
// t.pair_value = [789, 3];
t.value = "S5T#3m_26s_300ms";
console.log('value:', t.value);
console.log('pair_value:', t.pair_value);
console.log('buffer:', t.buffer);
console.log('raw:', buff);
console.log("\n");

t = createTag("DATE", { name: "myDate" });
t.mount(buff, [2]);
console.log(`S7Tag ${t.name} :`);
t.value = "D#2015-4-16";
// t.value = 36;
console.log('value:', t.value);
console.log('rawValue:', t.rawValue);
console.log('JSDate:', t.JSDate);
console.log('buffer:', t.buffer);
console.log('raw:', buff);
console.log("\n");

t = createTag("TOD", { name: "myTOD" });
t.mount(buff, [4]);
console.log(`S7Tag ${t.name} :`);
t.value = "TOD#23:00:12.999";
console.log('rawValue:', t.rawValue);
console.log('value:', t.value);
console.log('buffer:', t.buffer);
console.log('raw:', buff);
console.log("\n");

t = createTag("TIME", { name: "myTime" });
t.mount(buff, [8]);
console.log(`S7Tag ${t.name} :`);
t.value = "T#-22d_20m_876ms";
console.log('rawValue:', t.rawValue);
console.log('value:', t.value);
console.log('buffer:', t.buffer);
console.log('raw:', buff);
console.log("\n");

