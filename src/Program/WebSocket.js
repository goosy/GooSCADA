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
            let action = req?.action;
            let value = req?.value;
            let error = false;
            if (!name || !action || !s7plc?.get_mem) return;
            const mem = s7plc.get_mem(...name); 
            if (!mem?.buffer) error = req.name + " memory does not exist!";
            else if (action == "subscribe") {
                const action = "subscribeResponse";
                const name = req.name;
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
            const ret = error ? { error } : { action: action + "Response", name: req.name, value };
            ws.send(JSON.stringify(ret));
        } catch (err) {
            console.error(err);
        }
    });
}

/**
 * create a WebScoket Server
 * @todo 增加变量订阅，变量改变时主动发送新值  {action:"update", name, value}
 * @param {Object} options
 * @param {number} options.port
 * @param {S7PLC} options.s7plc
 * @returns {WebSocket.Server}
 */
export function S7WSServer({ port = 8080, s7plc } = { port: 8080 }) {
    const wss = new WebSocket.Server({ port });

    wss.on('connection', (ws, req) => {
        ws.isAlive = true;
        ws.on('pong', heartbeat);
        console.log(req.socket.remoteAddress, " is connected");
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
