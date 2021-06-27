import snap7 from "../src/node-snap7.js";

var s7client = new snap7.S7Client();

await s7client.ConnectTo('127.0.0.1', 0, 1);
let res;
// let buff = Buffer.alloc(4, 0x80);
// res = await s7client.DBWrite(8, 0, 4, buff);
// console.log(res);
// res = await s7client.DBRead(10, 0, 4);
// console.log(res);

setInterval(async () => {
    let res = await s7client.DBRead(8, 0, 50);
    console.log(res);
}, 5000);