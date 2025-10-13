import WebSocket from "faye-websocket";
import { S7PLC } from "../S7PLC.js";

/**
 * 处理接收到的消息
 * @param {WebSocket.Client} ws
 * @param {S7PLC} s7plc
 * @returns {any}
 */
function onMessage(ws, s7plc) {
    ws.on('message', (event) => {
        const message = event.data;
        try {
            const msg = JSON.parse(message);
            const name = msg?.name;
            const action = msg?.action;
            let value = msg?.value;
            let error = false;
            if (!name || !action || !s7plc?.get_mem) return;
            const mem = s7plc.get_mem(name);
            function getvalue() {
                if (mem?.hasValue) {
                    return mem.value;
                }
                return mem.buffer;
            }
            function subhandler() {
                if (ws.isAlive) {
                    ws.send(JSON.stringify({
                        action: "subscribeResponse",
                        name,
                        value: getvalue()
                    }));
                }
            }
            // parse action
            if (!mem?.buffer) {
                error = `${name} memory does not exist!`;
            } else if (action === "subscribe") {
                value = getvalue();
                mem.on("valuechange", subhandler);
            } else if (action === "read") {
                value = getvalue();
            } else if (action === "write" && mem.hasValue) {
                mem.value = value;
                value = mem.value;
            } else {
                error = "wrong request action!";
            }
            const ret = error ? { error } : { action: `${action}Response`, name, value };
            ws.send(JSON.stringify(ret));
        } catch (err) {
            console.error(err);
        }
    });
}

const clients = new Set();
const interval = setInterval(() => {
    clients.forEach((ws) => {
        if (ws.isAlive === false) {
            console.log("one isnt alive.")
            ws.close();
            clients.delete(ws);
            return;
        }
        ws.isAlive = false;
        ws.ping("are you alive?", () => {
            ws.isAlive = true;
        });
    });
}, 30000);
/**
 * create a WebScoket Server
 * @param {import('http').Server} httpserver
 * @param {S7PLC} s7plc
 */
export function attachWSServer(httpserver, s7plc) {
    httpserver.on('upgrade', (request, socket, body) => {
        if (WebSocket.isWebSocket(request)) {
            let ws = new WebSocket(request, socket, body);
            ws.isAlive = true;
            clients.add(ws);
            // ws.on('pong', heartbeat); // faye-websocket have not event:"pong"

            onMessage(ws, s7plc);
            ws.on('close', (event) => {
                console.log('close', event.code, event.reason);
                ws = null;
            });

        }
    });
    httpserver.on("close", () => {
        clearInterval(interval);
    })
    httpserver.wsclients = clients;
    console.log("WebSocket server started.")
}