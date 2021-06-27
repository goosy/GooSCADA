import WebSocket from 'ws';
import { S7PLC } from "../S7PLC.js";
import { ElementaryTag } from "../S7Memory/ElementaryTag.js";

function noop() { }

function heartbeat() {
    this.isAlive = true;
}

function onMessage(ws, s7plc) {
    ws.on('message', (message) => {
        try {
            const req = JSON.parse(message); 
            const name = req?.name?.split('/');
            const value = req?.value;
            const action = req?.action;
            if (!name || !action || !s7plc?.get_mem) return;
            const mem = s7plc.get_mem(...name);
            if (action == "read") {
                if (mem instanceof ElementaryTag) ws.send(mem.value);
                else ws.send(mem.buffer);
            } else if (action == "write"){
                mem.value = value;
                ws.send("write %s OK", value);
            }
        } catch (err) { console.error(err); }
    });
}

/**
 * create a WebScoket Server
 * @param {Object} options
 * @param {number} options.port
 * @param {S7PLC} options.s7plc
 * @returns {WebSocket.Server}
 */
export function S7WSServer({ port = 8080, s7plc } = { port: 8080 }) {
    const wss = new WebSocket.Server({ port });

    wss.on('connection', (ws) => {
        ws.isAlive = true;
        ws.on('pong', heartbeat);
        onMessage(ws, s7plc);
    });

    const interval = setInterval(() => {
        wss.clients.forEach((ws) => {
            if (ws.isAlive === false) return ws.terminate();
            ws.isAlive = false;
            ws.ping(noop);
        });
    }, 30000);

    wss.on('close', function close() {
        clearInterval(interval);
    });

    return wss;
}
