/*
 * Copyright (c) 2019, goosy.jo@gmail.com
 * MIT License
 */

import { plc_config_JSON } from "./conf/config.js";
import { connections } from "./conf/connections.js";
import { S7PLC, createS7Connection, attachWSServer } from "goovplc";
import { createHttpServer, setRouterOptions } from "goohmi";

// set title
import { setTitle } from "./src/setTitle.js";
setTitle(plc_config_JSON.description);

// ===== create a VPLC server
const s7plc = new S7PLC(plc_config_JSON);
s7plc.on("event", (event) => {
    console.log(s7plc.EventText(event));
});
s7plc.on("read", (tagObj, buffer) => {
    console.log("read ret: ", buffer);
})
s7plc.on("write", (tagObj, buffer) => {
    console.log("write: ", buffer);
})
s7plc.start_serve();

// ===== create HTTP Server for HMI serve 
setRouterOptions({
    '/conf/data.js': (request, response) => {// 动态生成 /data.js
        const sendDB = plc_config_JSON.areas[0];
        const recvDB = plc_config_JSON.areas[1];
        response.writeHead(200, {
            'Content-Type': 'application/javascript; charset="UTF-8"'
        });
        response.write(`// auto gen
const host = '${connections[0].localAddress + ":" + plc_config_JSON.port}';
const hostdesc = '${plc_config_JSON.description}';
const sendDB = ${JSON.stringify(sendDB)};
const recvDB = ${JSON.stringify(recvDB)};
export {host, hostdesc, sendDB, recvDB};
`);
        response.end();
    }
});
const httpserver = createHttpServer();

// ===== create WebSocket Server for JSON serve
attachWSServer(httpserver, s7plc);

// ===== http and WebSocket Server start listening
const host = "0.0.0.0"; // host = plc_config_JSON.host;
const port = plc_config_JSON.port;
httpserver.listen(port, host, () => {
    console.log(`HTTP Server is running on http://${host}:${port}`);
});

// ===== create S7TcpClient to send and receive S7PLC data
const conn_options = connections[0];
const client = createS7Connection(
    s7plc.get_mem(...conn_options.send),
    s7plc.get_mem(...conn_options.receive),
    conn_options
);

let timeout = { _destroyed: true },
    delay = 4000;
function delay_connect() {
    if (timeout._destroyed) timeout = setTimeout(() => {
        client.connect(conn_options);
        console.log("try connect to ", conn_options.host, conn_options.port);
    }, delay);
    delay = delay < 300000 ? delay * 2 : 300000;
}
client.on('connect', () => {
    console.log("connect the ESD-JS-AS!", conn_options.name);
    client.cyclic_send(1000);
})
client.on('data', (data) => {
    // 连接成功，接收 data
    client.receive(data);
});
client.on("end", function () {
    console.log("data end");
})
client.on("error", function (err) {
    console.log("can't connect.");
    delay_connect();
    this.stop_send();
})
client.on("close", function () {
    console.log("connection closed");
    this.stop_send();
    client.destroy();
    delay_connect();
})
