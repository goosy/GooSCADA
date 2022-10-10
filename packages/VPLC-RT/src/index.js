/*
 * Copyright (c) 2019, goosy.jo@gmail.com
 * MIT License
 */

import { S7PLC, createS7Connection, attachWSServer } from "goovplc";
import { createHttpServer, setRouterOptions } from "goohmi";
import { get_plc_config, get_connections, get_custom_program } from './config.js';
import { setTitle } from "./setTitle.js";

export async function start(conf_path) {
    const plc_config = await get_plc_config(conf_path);
    const connections = await get_connections(conf_path);
    const custom_program = await get_custom_program(conf_path);

    // set title
    setTitle(plc_config.description);

    // ===== create a VPLC server
    const s7plc = new S7PLC(plc_config);
    s7plc.on("event", (event) => {
        console.log(s7plc.EventText(event));
    });
    s7plc.on("read", (_, buffer) => {
        console.log("read ret: ", buffer);
    })
    s7plc.on("write", (_, buffer) => {
        console.log("write: ", buffer);
    })
    s7plc.start_serve();
    for (const conn of connections) {
        const send = s7plc.get_mem(conn.send);
        const receive = s7plc.get_mem(conn.receive);
        conn.data = { send, receive };
    }
    s7plc.connections = connections;
    custom_program(s7plc);

    // ===== create HTTP Server for HMI serve 
    setRouterOptions({
        '/conf/data.js': (request, response) => {// 动态生成 /data.js
            const DBs = plc_config.areas;
            response.writeHead(200, {
                'Content-Type': 'application/javascript; charset="UTF-8"'
            });
            response.write(`// auto gen
const host = '${connections[0].localAddress + ":" + plc_config.port}';
const hostdesc = '${plc_config.description}';
const DBs = ${JSON.stringify(DBs)};
export {host, hostdesc, DBs};
`);
            response.end();
        }
    });
    const httpserver = createHttpServer();

    // ===== create WebSocket Server for JSON serve
    attachWSServer(httpserver, s7plc);

    // ===== http and WebSocket Server start listening
    const host = "0.0.0.0"; // host = plc_config_JSON.host;
    const port = plc_config.port;
    httpserver.listen(port, host, () => {
        console.log(`HTTP Server is running on http://${host}:${port}`);
    });

    // ===== create S7TcpClient to send and receive S7PLC data
    for (const conn of connections) {
        const client = createS7Connection(conn.data, conn);
        let timeout = { _destroyed: true },
            delay = 4000;
        function delay_connect() {
            if (timeout._destroyed) timeout = setTimeout(() => {
                client.connect(conn);
                console.log("try connect to ", conn.host, conn.port);
            }, delay);
            delay = delay < 300000 ? delay * 2 : 300000;
        }
        client.on('connect', () => {
            console.log("connect the ESD-JS-AS!", conn.name);
            client.cyclic_send(1000);
        });
        client.on('data', (data) => {
            // 连接成功，接收 data
            client.receive(data);
        });
        client.on("end", function () {
            console.log("data end");
        });
        client.on("error", function (err) {
            console.log("can't connect.");
            delay_connect();
            this.stop_send();
        });
        client.on("close", function () {
            console.log("connection closed");
            this.stop_send();
            client.destroy();
            delay_connect();
        });
    }
}
