import * as Tag from "../src/Tag/index.js"

console.log("================================\n")

let buff = Buffer.alloc(50);
let t;

t = new Tag.S5TimeTag("myS5Time");
t.bind(buff, 0);
console.log(`Tag ${t.name} :`);
t.base = Tag.S5TimeTag.base_100ms;
t.count = 789;
console.log('base:',t.base);
console.log('count:',t.count);
console.log('value:',t.value);
console.log('buffer:', t.buffer);
console.log('raw:', buff);
console.log("\n");

t = new Tag.DateTag("myDate");
t.bind(buff, 2);
console.log(`Tag ${t.name} :`);
t.value = "D#2015-4-16";
console.log('rawValue:', t.rawValue);
console.log('value:', t.value);
console.log('buffer:', t.buffer);
console.log('raw:', buff);
console.log("\n");

t = new Tag.TODTag("myTOD");
t.bind(buff, 4);
console.log(`Tag ${t.name} :`);
t.value = "TOD#23:00:12.999";
console.log('rawValue:', t.rawValue);
console.log('value:', t.value);
console.log('buffer:', t.buffer);
console.log('raw:', buff);
console.log("\n");

t = new Tag.TimeTag("myTime");
t.bind(buff, 8);
console.log(`Tag ${t.name} :`);
t.value = "T#-22d_20m_876ms";
console.log('rawValue:', t.rawValue);
console.log('value:', t.value);
console.log('buffer:', t.buffer);
console.log('raw:', buff);
console.log("\n");

