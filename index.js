/*
 * Copyright (c) 2019, goosy.jo@gmail.com
 * MIT License
 */

import { S7PLC, GooNodeDriver } from "./src/index.js";
import { plc_config_JSON } from "./conf/config.js";
import { connections } from "./conf/connections.js";
import { S7TcpClient } from "./src/Program/TcpClient.js";

// create a VPLC server
const plc = new S7PLC(plc_config_JSON);

plc.on("event", (event) => {
    console.log(plc.EventText(event));
});

plc.start_serve();

/* 创建TCP连接 */
const conn_control = connections[0];
const send = plc.get_mem(...conn_control.send).buffer;
const receive = plc.get_mem(...conn_control.receive).buffer;
const client = new S7TcpClient(send, receive);
client.on('data', (data) => {
    // 连接成功，接收 data
    client.receive(data);
});
client.on("end", function () {
    console.log("data end");
})
client.on("error", function (err) {
    console.log(err);
    this.stop_send();
    setTimeout(try_connect, 5000);
})
client.on("close", function () {
    console.log("connection closed");
    this.stop_send();
})

function try_connect() {
    client.connect(conn_control.port, conn_control.host, () => {
        console.log("connect the ESD-JS-AS!");
        client.cyclic_send(1000);
    });
}
try_connect();
