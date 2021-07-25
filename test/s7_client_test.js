import { S7Client } from "s7client";

// PLC Connection Settings
const plcSettings = {
    name: "LocalPLC",
    host: 'localhost',
    // port: 102,
    // rack: 0,
    // slot: 1
};

// DBA to read
let dbNr = 8;
let dbVars = [
    { type: 'INT', start: 0 },
    { type: "BOOL", start: 2, bit: 0 },
    { type: "BOOL", start: 2, bit: 1 },
    { type: "BOOL", start: 2, bit: 2 },
    { type: "BOOL", start: 2, bit: 3 },
    { type: "REAL", start: 12 }
];

let client = new S7Client(plcSettings);
client.on('error', console.error);
await client.connect();

// Read DB
const res = await client.readDB(dbNr, dbVars);
console.log(res);

// Write multiple Vars
await client.writeVars([{
    area: 'db', dbnr: 8, type: 'INT',
    start: 0, //bit: 2,
    value: 78
}]);

client.disconnect();
