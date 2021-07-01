import WebSocket from "faye-websocket";
import { S7PLC } from "../S7PLC.js";
import { ElementaryTag } from "../S7Memory/ElementaryTag.js";

/**
 * 处理接收到的消息
 * @param {WebSocket.Client} ws
 * @param {S7PLC} s7plc
 * @returns {any}
 */
function onMessage(ws, s7plc) {
    ws.on('message', (event) => {
        let message = event.data;
        try {
            const msg = JSON.parse(message);
            const name = msg?.name?.split('/');
            let action = msg?.action;
            let value = msg?.value;
            let error = false;
            if (!name || !action || !s7plc?.get_mem) return;
            const mem = s7plc.get_mem(...name);
            if (!mem?.buffer) error = msg.name + " memory does not exist!";
            else if (action == "subscribe") {
                const action = "subscribeResponse";
                const name = msg.name;
                value = mem.value;
                mem.on("valuechange", () => {
                    if (ws.isAlive) {
                        const value = mem.value;
                        ws.send(JSON.stringify({
                            action,
                            name,
                            value
                        }));
                    }
                })
            }
            else if (action == "read") {
                if (mem instanceof ElementaryTag) value = mem.value;
                else value = mem.buffer;
            } else if (action == "write") {
                mem.value = value;
                value = mem.value;
            } else {
                error = "wrong request action!";
            }
            const ret = error ? { error } : { action: action + "Response", name: msg.name, value };
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
        ws.ping("are you alive?",()=>{
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
    httpserver.on('upgrade', function (request, socket, body) {
        if (WebSocket.isWebSocket(request)) {
            let ws = new WebSocket(request, socket, body);
            ws.isAlive = true;
            clients.add(ws);
            // ws.on('pong', heartbeat); // faye-websocket have not event:"pong"

            onMessage(ws, s7plc);
            ws.on('close', function (event) {
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