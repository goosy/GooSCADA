import snap7 from "../src/node-snap7.js";

var s7client = new snap7.S7Client();

await s7client.ConnectTo('127.0.0.1', 0, 1);
// Read the first byte from PLC process outputs...
let res = await s7client.DBRead(8, 0, 50);
console.log(res);