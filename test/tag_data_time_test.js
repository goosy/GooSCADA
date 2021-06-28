import { createMemory } from "../src/S7Memory/index.js"
const db = createMemory({ type: "DB", name: "myDB", bytes: 50 });
db.mount(Buffer.alloc(50));
let buff = db.buffer;
let t;

console.log("================================")
t = createMemory({ type: "S5TIME", name: "myS5Time" });
t.join(db, [0]);
t.mount(buff);
console.log(`S7Tag ${t.name} :`);
// t.pair_value = [789, 3];
t.value = "S5T#1h_13m_26s_990ms";
console.log('value:', t.value);
console.log('pair_value:', t.pair_value);
console.log('buffer:', t.buffer);
console.log('raw:', buff);
console.log("\n");

console.log("================================")
t = createMemory({ type: "DATE", name: "myDate" });
t.join(db, [2]);
t.mount(buff);
console.log(`S7Tag ${t.name} :`);
t.value = "D#2015-4-16";
// t.value = 36;
console.log('value:', t.value);
console.log('rawValue:', t.rawValue);
console.log('JSDate:', t.JSDate);
console.log('buffer:', t.buffer);
console.log('raw:', buff);
console.log("\n");

console.log("================================")
t = createMemory({ type: "TOD", name: "myTOD" });
t.join(db, [4]);
t.mount(buff);
console.log(`S7Tag ${t.name} :`);
t.value = "TOD#23:00:12.999";
console.log('rawValue:', t.rawValue);
console.log('value:', t.value);
console.log('buffer:', t.buffer);
console.log('raw:', buff);
console.log("\n");

console.log("================================")
t = createMemory({ type: "TIME", name: "myTime" });
t.join(db, [8]);
t.mount(buff);
console.log(`S7Tag ${t.name} :`);
t.value = "T#-22d_20m_876ms";
console.log('rawValue:', t.rawValue);
console.log('value:', t.value);
console.log('buffer:', t.buffer);
console.log('raw:', buff);
console.log("\n");

console.log("================================")
t = createMemory({ type: "DT", name: "myDateAndTime" });
t.join(db, [12]);
t.mount(buff);
console.log(`S7Tag ${t.name} :`);
t.value = "DT#2015-12-22-10:20:55.876";
console.log('value:', t.value);
console.log('date:', t.date);
console.log('get_tag("year").value:', t.get_tag("year").value);
console.log('buffer:', t.buffer);
console.log('raw:', buff);
console.log("\n");
